import "server-only";
import { and, count, desc, eq } from "drizzle-orm";
import { cache } from "react";
import { db } from "@/drizzle/db";
import { blog } from "@/drizzle/schema";
import type { BlogAuthor, BlogType } from "@/drizzle/types";

export type PublishedPost = BlogType & { author: BlogAuthor | null };

export const getPublishedPost = cache(
  async (slug: string): Promise<PublishedPost | null> => {
    const post = await db.query.blog.findFirst({
      where: and(eq(blog.slug, slug), eq(blog.status, "PUBLISHED")),
      with: {
        author: { columns: { id: true, name: true, image: true } },
      },
    });

    return post ?? null;
  },
);

export const POSTS_PER_PAGE = 40;

export type BlogCard = Pick<
  BlogType,
  | "id"
  | "title"
  | "slug"
  | "excerpt"
  | "cover_image"
  | "image_alt"
  | "published_at"
>;

/**
 * One page of published posts, newest first.
 *
 * The count comes back with the rows so the caller can render the pager and
 * reject an out-of-range page without a second round trip.
 */
export const getPublishedPage = cache(
  async (
    page: number,
  ): Promise<{ posts: BlogCard[]; total: number; totalPages: number }> => {
    const [posts, [counted]] = await Promise.all([
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
        // Drafts never reach the public site.
        .where(eq(blog.status, "PUBLISHED"))
        .orderBy(desc(blog.published_at))
        .limit(POSTS_PER_PAGE)
        .offset((page - 1) * POSTS_PER_PAGE),

      db
        .select({ total: count() })
        .from(blog)
        .where(eq(blog.status, "PUBLISHED")),
    ]);

    const total = counted?.total ?? 0;

    return {
      posts,
      total,
      totalPages: Math.max(1, Math.ceil(total / POSTS_PER_PAGE)),
    };
  },
);

/** Every published post, for the sitemap. */
export const getPublishedSitemapEntries = cache(async () => {
  return db
    .select({
      slug: blog.slug,
      updated_at: blog.updated_at,
      published_at: blog.published_at,
    })
    .from(blog)
    .where(eq(blog.status, "PUBLISHED"))
    .orderBy(desc(blog.published_at));
});
