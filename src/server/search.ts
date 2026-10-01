import "server-only";
import { and, count, desc, eq, type SQL, sql } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { blog, blogSearchDocument } from "@/drizzle/schema";
import type { BlogCard } from "@/server/blog";

export const SEARCH_PAGE_SIZE = 20;
export const SEARCH_MIN_LENGTH = 2;

export type SearchSort = "relevance" | "newest";

export type SearchResult = {
  hits: BlogCard[];
  total: number;
  page: number;
  totalPages: number;
};

export function normalizeQuery(value: unknown): string {
  return typeof value === "string"
    ? value.replace(/\s+/g, " ").trim().slice(0, 100)
    : "";
}

export async function searchPublishedPosts({
  query,
  page = 1,
  sort = "relevance",
  limit = SEARCH_PAGE_SIZE,
}: {
  query: string;
  page?: number;
  sort?: SearchSort;
  limit?: number;
}): Promise<SearchResult> {
  const q = normalizeQuery(query);
  const current = Math.max(1, Math.trunc(page) || 1);

  if (q.length < SEARCH_MIN_LENGTH) {
    return { hits: [], total: 0, page: current, totalPages: 1 };
  }

  const document = blogSearchDocument(blog);
  const tsQuery = sql`websearch_to_tsquery('english', ${q})`;
  const matches: SQL = sql`(${document} @@ ${tsQuery} or ${q} <% ${blog.title})`;
  const score = sql`ts_rank_cd(${document}, ${tsQuery}) + word_similarity(${q}, ${blog.title})`;
  const where = and(eq(blog.status, "PUBLISHED"), matches);

  const [hits, [counted]] = await Promise.all([
    db
      .select({
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        cover_image: blog.cover_image,
        image_alt: blog.image_alt,
        published_at: blog.published_at,
      })
      .from(blog)
      .where(where)
      .orderBy(
        ...(sort === "newest"
          ? [desc(blog.published_at)]
          : [desc(score), desc(blog.published_at)]),
      )
      .limit(limit)
      .offset((current - 1) * limit),

    db.select({ total: count() }).from(blog).where(where),
  ]);

  const total = counted?.total ?? 0;

  return {
    hits,
    total,
    page: current,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}
