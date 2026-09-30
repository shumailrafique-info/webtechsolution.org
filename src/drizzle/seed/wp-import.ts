import https from "node:https";
import "dotenv/config";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../schema";
import { blog } from "../schema";
import { convertWpHtml, htmlToText } from "./wp-html";

/**
 * Imports published posts from a WordPress site into the blogs table.
 *
 * Content is fetched from the REST API, converted into the markup the Tiptap
 * editor understands (see `wp-html.ts`) and upserted by slug, so re-running
 * the import updates rather than duplicates. Images keep their original URLs;
 * nothing is copied into our bucket.
 *
 *   pnpm wp:import -- --site https://example.com
 *   pnpm wp:import -- --site https://example.com --limit 20   (a trial run)
 *   pnpm wp:import -- --site https://example.com --dry-run    (no writes)
 */

const args = process.argv.slice(2);
const flag = (name: string) => {
  const at = args.indexOf(`--${name}`);
  return at !== -1 ? (args[at + 1] ?? "") : undefined;
};
const has = (name: string) => args.includes(`--${name}`);

const SITE = (flag("site") ?? "").replace(/\/+$/, "");
const LIMIT = Number(flag("limit") ?? 0);
const DRY_RUN = has("dry-run");
const PER_PAGE = 100;

if (!SITE) {
  console.error(
    "Usage: pnpm wp:import -- --site https://example.com [--limit N] [--dry-run]",
  );
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 30_000,
});
const db = drizzle(pool, { schema });

type WpPost = {
  id: number;
  slug: string;
  date_gmt: string;
  status: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  yoast_head_json?: { title?: string; description?: string };
  _embedded?: {
    "wp:featuredmedia"?: {
      source_url?: string;
      alt_text?: string;
      title?: { rendered?: string };
    }[];
  };
};

/**
 * A plain HTTPS GET.
 *
 * `fetch` is not used here: its connect timeout is fixed at ten seconds and
 * cannot be raised without a custom dispatcher, which is not enough on every
 * network. This also pins IPv4, because an unreachable AAAA record otherwise
 * costs the whole timeout before anything is tried.
 */
function get(url: string): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    const request = https.get(
      url,
      {
        family: 4,
        timeout: 120_000,
        headers: { "user-agent": "webtech-import", accept: "application/json" },
      },
      (response) => {
        const chunks: Buffer[] = [];
        response.on("data", (chunk) => chunks.push(chunk as Buffer));
        response.on("end", () =>
          resolve({
            status: response.statusCode ?? 0,
            body: Buffer.concat(chunks).toString("utf8"),
          }),
        );
      },
    );
    request.on("timeout", () => request.destroy(new Error("timed out")));
    request.on("error", reject);
  });
}

async function fetchPage(page: number, attempt = 1): Promise<WpPost[]> {
  const url = `${SITE}/wp-json/wp/v2/posts?per_page=${PER_PAGE}&page=${page}&status=publish&_embed=wp:featuredmedia`;
  try {
    const res = await get(url);
    if (res.status === 400) return []; // past the last page
    if (res.status !== 200) throw new Error(`HTTP ${res.status} for ${url}`);
    return JSON.parse(res.body) as WpPost[];
  } catch (error) {
    if (attempt >= 3) throw error;
    console.log(`    retrying page ${page} (attempt ${attempt + 1})`);
    await new Promise((r) => setTimeout(r, 2000 * attempt));
    return fetchPage(page, attempt + 1);
  }
}

/** Trim to a length a meta field can use, without cutting mid-word. */
function clamp(value: string, max: number) {
  if (value.length <= max) return value;
  const cut = value.slice(0, max);
  const space = cut.lastIndexOf(" ");
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).trimEnd()}…`;
}

async function resolveAuthor() {
  const [author] = (
    await db.execute<{ id: string; name: string }>(sql`
      select id, name from "user"
      order by (role::text = 'admin') desc, created_at asc
      limit 1
    `)
  ).rows;
  return author ?? null;
}

async function main() {
  const [{ db: name }] = (
    await db.execute<{ db: string }>(sql`select current_database() as db`)
  ).rows;
  const author = await resolveAuthor();

  console.log(`Importing from ${SITE}`);
  console.log(`  into ${name}${DRY_RUN ? " (dry run - no writes)" : ""}`);
  console.log(
    author ? `  author: ${author.name}` : "  author: none found - no byline",
  );

  const posts: WpPost[] = [];
  for (let page = 1; ; page++) {
    const batch = await fetchPage(page);
    if (batch.length === 0) break;
    posts.push(...batch);
    console.log(`  fetched page ${page} (${posts.length} posts)`);
    if (batch.length < PER_PAGE) break;
    if (LIMIT && posts.length >= LIMIT) break;
  }

  const selected = LIMIT ? posts.slice(0, LIMIT) : posts;
  console.log(`  converting ${selected.length} posts`);

  const rows = [];
  const skipped: string[] = [];

  for (const post of selected) {
    const html = convertWpHtml(post.content.rendered);
    const title = htmlToText(post.title.rendered);

    if (!html || !title) {
      skipped.push(post.slug || String(post.id));
      continue;
    }

    const excerpt =
      htmlToText(post.excerpt.rendered) || clamp(htmlToText(html), 200);
    const media = post._embedded?.["wp:featuredmedia"]?.[0];
    const cover = media?.source_url ?? "";

    rows.push({
      slug: post.slug,
      title,
      excerpt: clamp(excerpt, 400),
      description: clamp(excerpt, 400),
      meta_title: clamp(post.yoast_head_json?.title || title, 200),
      meta_description: clamp(
        post.yoast_head_json?.description || excerpt,
        320,
      ),
      html,
      // Images keep their original URLs, so the key records where the file
      // lives rather than a path in our own bucket.
      cover_image: { url: cover, key: cover, type: "image" as const },
      image_alt: htmlToText(media?.alt_text || media?.title?.rendered || title),
      author_id: author?.id ?? null,
      status: "PUBLISHED" as const,
      published_at: new Date(`${post.date_gmt}Z`),
      created_at: new Date(`${post.date_gmt}Z`),
    });
  }

  const withoutCover = rows.filter((r) => !r.cover_image.url).length;
  console.log(
    `  ready: ${rows.length} posts${skipped.length ? `, skipped ${skipped.length} empty` : ""}${withoutCover ? `, ${withoutCover} without a cover image` : ""}`,
  );

  if (DRY_RUN) {
    for (const row of rows.slice(0, 3)) {
      console.log(`\n--- ${row.slug}`);
      console.log(`    ${row.title}`);
      console.log(`    ${row.html.slice(0, 220)}…`);
    }
    await pool.end();
    return;
  }

  // Upsert in batches: one statement per post is slow over 600 rows, and one
  // statement for all of them exceeds the parameter limit.
  let written = 0;
  for (let i = 0; i < rows.length; i += 50) {
    const batch = rows.slice(i, i + 50);
    await db
      .insert(blog)
      .values(batch)
      .onConflictDoUpdate({
        target: blog.slug,
        set: {
          title: sql`excluded.title`,
          excerpt: sql`excluded.excerpt`,
          description: sql`excluded.description`,
          meta_title: sql`excluded.meta_title`,
          meta_description: sql`excluded.meta_description`,
          html: sql`excluded.html`,
          cover_image: sql`excluded.cover_image`,
          image_alt: sql`excluded.image_alt`,
          author_id: sql`excluded.author_id`,
          status: sql`excluded.status`,
          published_at: sql`excluded.published_at`,
        },
      });
    written += batch.length;
    process.stdout.write(`\r  written ${written}/${rows.length}`);
  }

  const [{ n }] = (
    await db.execute<{ n: number }>(sql`select count(*)::int as n from "blogs"`)
  ).rows;
  console.log(`\nDone. ${written} imported; ${n} posts in the table.`);
  await pool.end();
}

main().catch(async (error) => {
  console.error("\nImport failed", error);
  await pool.end().catch(() => {});
  process.exit(1);
});
