"use server";

import { asc, count, eq } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { blog, blogCategory } from "@/drizzle/schema";
import type { BlogCategoryType } from "@/drizzle/types";
import { ensureAdminAccess, ensureBlogWriterAccess } from "@/lib/auth/guards";
import { revalidateCategoryContent } from "@/server/revalidate";
import type { ApiResponse } from "@/types/global";

export type BlogCategoryListItem = BlogCategoryType & { posts: number };

export async function getBlogCategories(): Promise<
  ApiResponse<BlogCategoryListItem[]>
> {
  const guard = await ensureAdminAccess();
  if (!guard.session) {
    return { success: false, error: "Admin access required." };
  }

  try {
    const rows = await db
      .select({ category: blogCategory, posts: count(blog.id) })
      .from(blogCategory)
      .leftJoin(blog, eq(blog.category_id, blogCategory.id))
      .groupBy(blogCategory.id)
      .orderBy(asc(blogCategory.name));

    return {
      success: true,
      data: rows.map((row) => ({ ...row.category, posts: row.posts })),
    };
  } catch (error) {
    console.error("getBlogCategories failed", error);
    return { success: false, error: "Could not load categories." };
  }
}

export async function deleteBlogCategory(
  id: string,
): Promise<ApiResponse<{ id: string }>> {
  const guard = await ensureAdminAccess();
  if (!guard.session) {
    return { success: false, error: "Admin access required." };
  }

  try {
    const posts = await db
      .select({ slug: blog.slug })
      .from(blog)
      .where(eq(blog.category_id, id));

    const [deleted] = await db
      .delete(blogCategory)
      .where(eq(blogCategory.id, id))
      .returning({ id: blogCategory.id, slug: blogCategory.slug });

    if (!deleted) {
      return { success: false, error: "That category no longer exists." };
    }

    revalidateCategoryContent(
      [deleted.slug],
      posts.map((post) => post.slug),
    );
    return { success: true, data: { id: deleted.id } };
  } catch (error) {
    console.error("deleteBlogCategory failed", error);
    return { success: false, error: "Could not delete the category." };
  }
}

export async function getCategoryOptions(): Promise<
  ApiResponse<Pick<BlogCategoryType, "id" | "name">[]>
> {
  const guard = await ensureBlogWriterAccess();
  if (!guard.session) {
    return { success: false, error: "Sign in to manage posts." };
  }

  try {
    const rows = await db
      .select({ id: blogCategory.id, name: blogCategory.name })
      .from(blogCategory)
      .orderBy(asc(blogCategory.name));
    return { success: true, data: rows };
  } catch (error) {
    console.error("getCategoryOptions failed", error);
    return { success: false, error: "Could not load categories." };
  }
}
