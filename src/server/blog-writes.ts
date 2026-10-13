import "server-only";
import {
  and,
  count,
  desc,
  eq,
  getTableColumns,
  ilike,
  or,
  type SQL,
} from "drizzle-orm";
import { db } from "@/drizzle/db";
import { blog, blogCategory } from "@/drizzle/schema";
import type { BlogType } from "@/drizzle/types";
import type { BlogSchemaValues } from "@/lib/validation/zod/blog.schema";
import { revalidateBlogContent } from "@/server/revalidate";
import {
  ADMIN_PAGE_SIZE,
  type ApiResponse,
  type Paginated,
} from "@/types/global";

export type BlogListRow = BlogType & { category_name: string | null };

function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as { code?: unknown }).code === "23505"
  );
}

function escapeLikeTerm(term: string) {
  return term.replace(/[\\%_]/g, (match) => `\\${match}`);
}

function toRow(values: BlogSchemaValues, authorId: string | null) {
  return {
    title: values.title,
    excerpt: values.excerpt,
    description: values.description ?? "",
    meta_title: values.meta_title,
    meta_description: values.meta_description,
    slug: values.slug,
    html: values.html,
    cover_image: values.cover_image[0],
    image_alt: values.image_alt,
    status: values.status,
    author_id: authorId,
    category_id: values.category_id,
  };
}

function ownedBy(id: string, ownerId: string | undefined): SQL | undefined {
  return ownerId
    ? and(eq(blog.id, id), eq(blog.author_id, ownerId))
    : eq(blog.id, id);
}

export async function listBlogs({
  search,
  page,
  ownerId,
}: {
  search?: string;
  page: number;
  ownerId?: string;
}): Promise<ApiResponse<Paginated<BlogListRow>>> {
  const term = search?.trim();
  const current = Math.max(1, Math.trunc(page));

  const filter = and(
    ownerId ? eq(blog.author_id, ownerId) : undefined,
    term
      ? or(
          ilike(blog.title, `%${escapeLikeTerm(term)}%`),
          ilike(blog.slug, `%${escapeLikeTerm(term)}%`),
        )
      : undefined,
  );

  try {
    const [rows, [counted]] = await Promise.all([
      db
        .select({ ...getTableColumns(blog), category_name: blogCategory.name })
        .from(blog)
        .leftJoin(blogCategory, eq(blog.category_id, blogCategory.id))
        .where(filter)
        .orderBy(desc(blog.created_at))
        .limit(ADMIN_PAGE_SIZE)
        .offset((current - 1) * ADMIN_PAGE_SIZE),
      db.select({ total: count() }).from(blog).where(filter),
    ]);

    const total = counted?.total ?? 0;
    return {
      success: true,
      data: {
        rows,
        total,
        page: current,
        totalPages: Math.max(1, Math.ceil(total / ADMIN_PAGE_SIZE)),
      },
    };
  } catch (error) {
    console.error("listBlogs failed", error);
    return { success: false, error: "Could not load blog posts." };
  }
}

export async function insertBlog(
  values: BlogSchemaValues,
  authorId: string | null,
): Promise<ApiResponse<BlogType>> {
  const row = toRow(values, authorId);

  const existing = await db.query.blog.findFirst({
    where: eq(blog.slug, row.slug),
    columns: { id: true },
  });
  if (existing) {
    return {
      success: false,
      error: `The slug "${row.slug}" is already in use.`,
    };
  }

  try {
    const [created] = await db
      .insert(blog)
      .values({
        ...row,
        published_at: row.status === "PUBLISHED" ? new Date() : null,
      })
      .returning();

    if (!created) {
      return { success: false, error: "Could not create the blog post." };
    }

    revalidateBlogContent(created.slug);
    return { success: true, data: created };
  } catch (error) {
    if (isUniqueViolation(error)) {
      return {
        success: false,
        error: `The slug "${row.slug}" is already in use.`,
      };
    }
    console.error("insertBlog failed", error);
    return { success: false, error: "Could not create the blog post." };
  }
}

export async function updateBlogById(
  id: string,
  values: BlogSchemaValues,
  authorId: string | null,
  ownerId?: string,
): Promise<ApiResponse<BlogType>> {
  const row = toRow(values, authorId);

  try {
    const existing = await db.query.blog.findFirst({
      where: ownedBy(id, ownerId),
      columns: { id: true, published_at: true, slug: true },
    });

    if (!existing) {
      return { success: false, error: "That blog post no longer exists." };
    }

    const published_at =
      row.status === "PUBLISHED" ? (existing.published_at ?? new Date()) : null;

    const [updated] = await db
      .update(blog)
      .set({ ...row, published_at })
      .where(ownedBy(id, ownerId))
      .returning();

    if (!updated) {
      return { success: false, error: "Could not update the blog post." };
    }

    revalidateBlogContent(existing.slug, updated.slug);
    return { success: true, data: updated };
  } catch (error) {
    if (isUniqueViolation(error)) {
      return {
        success: false,
        error: `The slug "${row.slug}" is already in use.`,
      };
    }
    console.error("updateBlogById failed", error);
    return { success: false, error: "Could not update the blog post." };
  }
}

export async function deleteBlogById(
  id: string,
  ownerId?: string,
): Promise<ApiResponse<{ id: string }>> {
  try {
    const [deleted] = await db
      .delete(blog)
      .where(ownedBy(id, ownerId))
      .returning({ id: blog.id, slug: blog.slug });

    if (!deleted) {
      return { success: false, error: "That blog post no longer exists." };
    }

    revalidateBlogContent(deleted.slug);
    return { success: true, data: { id: deleted.id } };
  } catch (error) {
    console.error("deleteBlogById failed", error);
    return { success: false, error: "Could not delete the blog post." };
  }
}
