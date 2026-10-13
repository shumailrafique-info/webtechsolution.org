import "server-only";
import { and, asc, count, desc, eq, gt, type SQL } from "drizzle-orm";
import { cache } from "react";
import { db } from "@/drizzle/db";
import { blog, blogCategory } from "@/drizzle/schema";
import type { BlogAuthor, BlogCategoryRef, BlogType } from "@/drizzle/types";

export type PublishedPost = BlogType & {
  author: BlogAuthor | null;
  category: BlogCategoryRef | null;
};

export const getPublishedPost = cache(
  async (slug: string): Promise<PublishedPost | null> => {
    const post = await db.query.blog.findFirst({
      where: and(eq(blog.slug, slug), eq(blog.status, "PUBLISHED")),
      with: {
        author: { columns: { id: true, name: true, bio: true, avatar: true } },
        category: { columns: { id: true, name: true, slug: true } },
      },
    });

    if (!post) return null;

    const { author, ...rest } = post;
    return {
      ...rest,
      author: author
        ? {
            id: author.id,
            name: author.name,
            bio: author.bio,
            image: author.avatar,
          }
        : null,
    };
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

export const getPublishedPage = cache(
  async (
    page: number,
    categoryId?: string,
  ): Promise<{ posts: BlogCard[]; total: number; totalPages: number }> => {
    const where: SQL | undefined = categoryId
      ? and(eq(blog.status, "PUBLISHED"), eq(blog.category_id, categoryId))
      : eq(blog.status, "PUBLISHED");

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
        .where(where)
        .orderBy(desc(blog.published_at))
        .limit(POSTS_PER_PAGE)
        .offset((page - 1) * POSTS_PER_PAGE),

      db.select({ total: count() }).from(blog).where(where),
    ]);

    const total = counted?.total ?? 0;

    return {
      posts,
      total,
      totalPages: Math.max(1, Math.ceil(total / POSTS_PER_PAGE)),
    };
  },
);

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

export const getCategoryBySlug = cache(
  async (slug: string): Promise<BlogCategoryRef | null> => {
    const category = await db.query.blogCategory.findFirst({
      where: eq(blogCategory.slug, slug),
      columns: { id: true, name: true, slug: true },
    });

    return category ?? null;
  },
);

export type NavCategory = BlogCategoryRef & { posts: number };

export const getNavCategories = cache(async (): Promise<NavCategory[]> => {
  return db
    .select({
      id: blogCategory.id,
      name: blogCategory.name,
      slug: blogCategory.slug,
      posts: count(blog.id),
    })
    .from(blogCategory)
    .innerJoin(
      blog,
      and(eq(blog.category_id, blogCategory.id), eq(blog.status, "PUBLISHED")),
    )
    .groupBy(blogCategory.id)
    .having(gt(count(blog.id), 0))
    .orderBy(asc(blogCategory.name));
});
