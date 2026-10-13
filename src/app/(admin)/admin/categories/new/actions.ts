"use server";

import { eq } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { blog, blogCategory } from "@/drizzle/schema";
import type { BlogCategoryType } from "@/drizzle/types";
import { ensureAdminAccess } from "@/lib/auth/guards";
import {
  type BlogCategorySchemaValues,
  blogCategorySchema,
} from "@/lib/validation/zod/blog-category.schema";
import { revalidateCategoryContent } from "@/server/revalidate";
import type { ApiResponse } from "@/types/global";

function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as { code?: unknown }).code === "23505"
  );
}

export async function createBlogCategory(
  input: BlogCategorySchemaValues,
): Promise<ApiResponse<BlogCategoryType>> {
  const guard = await ensureAdminAccess();
  if (!guard.session) {
    return { success: false, error: "Admin access required." };
  }

  const parsed = blogCategorySchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid category details.",
    };
  }

  try {
    const [created] = await db
      .insert(blogCategory)
      .values(parsed.data)
      .returning();
    revalidateCategoryContent([created.slug], []);
    return { success: true, data: created };
  } catch (error) {
    if (isUniqueViolation(error)) {
      return {
        success: false,
        error: `The slug "${parsed.data.slug}" is already in use.`,
      };
    }
    console.error("createBlogCategory failed", error);
    return { success: false, error: "Could not create the category." };
  }
}

export async function updateBlogCategory(
  id: string,
  input: BlogCategorySchemaValues,
): Promise<ApiResponse<BlogCategoryType>> {
  const guard = await ensureAdminAccess();
  if (!guard.session) {
    return { success: false, error: "Admin access required." };
  }

  const parsed = blogCategorySchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid category details.",
    };
  }

  try {
    const previous = await db.query.blogCategory.findFirst({
      where: eq(blogCategory.id, id),
      columns: { slug: true },
    });

    const [updated] = await db
      .update(blogCategory)
      .set(parsed.data)
      .where(eq(blogCategory.id, id))
      .returning();

    if (!updated) {
      return { success: false, error: "That category no longer exists." };
    }

    const posts = await db
      .select({ slug: blog.slug })
      .from(blog)
      .where(eq(blog.category_id, id));

    revalidateCategoryContent(
      [updated.slug, previous?.slug ?? updated.slug],
      posts.map((post) => post.slug),
    );
    return { success: true, data: updated };
  } catch (error) {
    if (isUniqueViolation(error)) {
      return {
        success: false,
        error: `The slug "${parsed.data.slug}" is already in use.`,
      };
    }
    console.error("updateBlogCategory failed", error);
    return { success: false, error: "Could not update the category." };
  }
}
