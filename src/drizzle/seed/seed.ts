import "dotenv/config";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { inArray, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../schema";
import { blog, pageContent } from "../schema";
import { BLOG_SEEDS } from "./blog-seed-data";
import { PAGE_SEEDS } from "./page-content-seed-data";

/**
 * Seeds this site's content.
 *
 * The database is shared with another site, so this script is deliberately
 * scoped: it replaces only the rows it owns - the blog slugs listed in
 * `blog-seed-data.ts` and the two managed pages - and never truncates a table.
 * Re-running it is safe and idempotent.
 *
 * Covers and in-article images are generated as SVG and uploaded to the media
 * bucket under a stable key, so a re-run replaces them rather than piling up
 * copies. Run with `pnpm db:seed`.
 */

/** Neon can take longer than the app pool's timeout to wake, so use our own. */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 60_000,
});
const db = drizzle(pool, { schema });

const BUCKET = process.env.AWS_BUCKET_NAME ?? "";
const REGION = process.env.AWS_BUCKET_REGION ?? "";
const PREFIX = "webtechsolution/blog";

const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY ?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  },
});

async function upload(name: string, svg: string) {
  const key = `${PREFIX}/${name}`;
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: svg,
      ContentType: "image/svg+xml",
      // The key is stable and a re-seed replaces the object, so this must not
      // be immutable or browsers would keep serving the previous version.
      CacheControl: "public, max-age=3600",
    }),
  );
  return `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;
}

/* ------------------------------------------------------------------ art */

/** Greedy wrap, so a long title stacks instead of running off the card. */
function wrap(title: string, perLine: number, maxLines: number) {
  const lines: string[] = [];
  let line = "";
  for (const word of title.split(" ")) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > perLine && line) {
      lines.push(line);
      line = word;
      if (lines.length === maxLines) break;
    } else {
      line = next;
    }
  }
  if (line && lines.length < maxLines) lines.push(line);
  return lines;
}

/** A 1200x630 cover: ground colour, an angled accent panel, the site mark. */
function coverSvg(
  [ink, paper]: [string, string],
  title: string,
  index: number,
) {
  const tilt = (index % 3) - 1;
  const lines = wrap(title, 24, 3);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" font-family="Inter, Segoe UI, sans-serif">
  <rect width="1200" height="630" fill="${paper}"/>
  <rect x="${700 + tilt * 40}" y="-80" width="700" height="800" rx="56" fill="${ink}" opacity="0.92" transform="rotate(${10 + tilt * 4} 1000 300)"/>
  <circle cx="${150 + tilt * 30}" cy="${500 - tilt * 25}" r="160" fill="${ink}" opacity="0.10"/>
  <rect x="84" y="84" width="52" height="52" rx="14" fill="${ink}"/>
  <text x="110" y="120" font-size="30" font-weight="700" fill="${paper}" text-anchor="middle">W</text>
  <text x="152" y="120" font-size="26" font-weight="600" fill="${ink}">Web Tech Solutions</text>
  <text x="84" y="${330 - (lines.length - 1) * 34}" font-size="54" font-weight="700" fill="${ink}">${lines
    .map(
      (line, i) =>
        `<tspan x="84" dy="${i === 0 ? 0 : 68}">${escapeXml(line)}</tspan>`,
    )
    .join("")}</text>
  <rect x="84" y="${400 + (lines.length - 1) * 34}" width="120" height="8" rx="4" fill="${ink}"/>
</svg>`;
}

/** Simple diagram art for the in-article images, so nothing 404s. */
function figureSvg(label: string, accent: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600" viewBox="0 0 1200 600" font-family="Inter, Segoe UI, sans-serif">
  <rect width="1200" height="600" rx="24" fill="#fff7ed"/>
  <rect x="1" y="1" width="1198" height="598" rx="24" fill="none" stroke="${accent}" stroke-opacity="0.25" stroke-width="2"/>
  ${[0, 1, 2]
    .map(
      (i) => `<g transform="translate(${90 + i * 360} 190)">
    <rect width="300" height="220" rx="18" fill="#ffffff" stroke="${accent}" stroke-opacity="0.45" stroke-width="2"/>
    <rect x="28" y="36" width="150" height="16" rx="8" fill="${accent}" opacity="0.85"/>
    <rect x="28" y="72" width="244" height="10" rx="5" fill="${accent}" opacity="0.28"/>
    <rect x="28" y="94" width="210" height="10" rx="5" fill="${accent}" opacity="0.28"/>
    <rect x="28" y="116" width="228" height="10" rx="5" fill="${accent}" opacity="0.28"/>
    <rect x="28" y="160" width="96" height="28" rx="14" fill="${accent}" opacity="0.9"/>
  </g>`,
    )
    .join("")}
  ${[0, 1]
    .map(
      (i) =>
        `<path d="M ${390 + i * 360} 300 L ${450 + i * 360} 300" stroke="${accent}" stroke-width="4" stroke-linecap="round" marker-end="url(#a)"/>`,
    )
    .join("")}
  <defs><marker id="a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${accent}"/></marker></defs>
  <text x="600" y="112" font-size="30" font-weight="600" fill="${accent}" text-anchor="middle">${escapeXml(label)}</text>
</svg>`;
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* ----------------------------------------------------------------- main */

/** Every in-article image referenced by the seeds, with its caption art. */
const FIGURES: [name: string, label: string, accent: string][] = [
  ["perf-budget.svg", "Budget · Measure · Review", "#f4552b"],
  ["perf-waterfall.svg", "Request → Critical path → Paint", "#f4552b"],
  ["ds-token-layers.svg", "Primitives → Semantics → Components", "#c2410c"],
  [
    "ds-component-states.svg",
    "Default · Hover · Focus · Disabled · Loading",
    "#c2410c",
  ],
  ["cms-architecture.svg", "Traditional · Headless · Integrated", "#9a3412"],
  ["cms-decision-tree.svg", "Surfaces → Editors → Choice", "#9a3412"],
  ["a11y-focus-order.svg", "Tab order follows reading order", "#7c2d12"],
  ["a11y-contrast.svg", "4.5:1 body · 3:1 large text", "#7c2d12"],
  [
    "process-timeline.svg",
    "Discover → Structure → Design → Build → Launch",
    "#ea580c",
  ],
  ["process-approval.svg", "One approver, two rounds", "#ea580c"],
];

/**
 * The account seeded posts are attributed to.
 *
 * An admin is preferred, otherwise the earliest account. Accounts are created
 * by signing in, so a database nobody has signed into yet has none - in that
 * case the posts are written without an author and the byline falls back to
 * the site itself, exactly as it does for a post an editor never claimed.
 */
async function resolveAuthor() {
  const [author] = (
    await db.execute<{ id: string; name: string; role: string | null }>(sql`
      select id, name, role::text as role
      from "user"
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
  const slugs = BLOG_SEEDS.map((post) => post.slug);
  console.log(`Seeding ${name}`);
  console.log(
    `  scope: ${slugs.length} blog slugs + ${PAGE_SEEDS.length} managed pages (other rows untouched)`,
  );

  const author = await resolveAuthor();
  console.log(
    author
      ? `  author: ${author.name}${author.role ? ` (${author.role})` : ""}`
      : "  author: none found - posts will have no byline",
  );

  // Article art first, so the HTML never points at a missing object.
  for (const [fileName, label, accent] of FIGURES) {
    await upload(fileName, figureSvg(label, accent));
  }
  console.log(`  uploaded ${FIGURES.length} article images`);

  // Remove previous copies of exactly these posts, so a re-run is a replace
  // rather than a duplicate-key failure or a pile of near-identical rows.
  const removed = await db
    .delete(blog)
    .where(inArray(blog.slug, slugs))
    .returning({ slug: blog.slug });
  if (removed.length > 0) {
    console.log(`  replaced ${removed.length} existing post(s)`);
  }

  const now = Date.now();
  const rows = [];
  for (const [index, post] of BLOG_SEEDS.entries()) {
    const url = await upload(
      `${post.slug}.svg`,
      coverSvg(post.cover, post.title, index),
    );
    const publishedAt =
      post.status === "PUBLISHED"
        ? new Date(now - post.daysAgo * 86_400_000)
        : null;

    rows.push({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      description: post.excerpt,
      meta_title: post.metaTitle,
      meta_description: post.metaDescription,
      html: post.html,
      author_id: author?.id ?? null,
      cover_image: {
        url,
        key: `${PREFIX}/${post.slug}.svg`,
        type: "image" as const,
      },
      image_alt: post.imageAlt,
      status: post.status,
      published_at: publishedAt,
      created_at: publishedAt ?? new Date(now),
    });
    process.stdout.write(`  ${post.slug} (cover uploaded)\n`);
  }

  const written = await db
    .insert(blog)
    .values(rows)
    .returning({ slug: blog.slug, status: blog.status });

  for (const page of PAGE_SEEDS) {
    await db
      .insert(pageContent)
      .values({
        slug: page.slug,
        title: page.title,
        description: page.description,
        meta_title: page.metaTitle,
        meta_description: page.metaDescription,
        html: page.html,
        faqs: page.faqs,
        related_slugs: null,
      })
      .onConflictDoUpdate({
        target: pageContent.slug,
        set: {
          title: sql`excluded.title`,
          description: sql`excluded.description`,
          meta_title: sql`excluded.meta_title`,
          meta_description: sql`excluded.meta_description`,
          html: sql`excluded.html`,
          faqs: sql`excluded.faqs`,
          related_slugs: sql`excluded.related_slugs`,
        },
      });
    console.log(`  ${page.slug} (${page.faqs.length} FAQs)`);
  }

  const published = written.filter((row) => row.status === "PUBLISHED").length;
  console.log(
    `Done. ${written.length} posts (${published} published, ${written.length - published} draft), ${PAGE_SEEDS.length} pages.`,
  );
  await pool.end();
}

main().catch(async (error) => {
  console.error("Seed failed", error);
  await pool.end().catch(() => {});
  process.exit(1);
});
