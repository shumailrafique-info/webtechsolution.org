"use server";

import type { BlogType } from "@/drizzle/types";
import { ensureAuthorAccess } from "@/lib/auth/guards";
import {
  type BlogSchemaValues,
  blogSchema,
} from "@/lib/validation/zod/blog.schema";
import {
  type BlogListRow,
  deleteBlogById,
  insertBlog,
  listBlogs,
  updateBlogById,
} from "@/server/blog-writes";
import type { ApiResponse, Paginated } from "@/types/global";

const DENIED = { success: false, error: "Author access required." } as const;

export async function getMyBlogs(
  search?: string,
  page = 1,
): Promise<ApiResponse<Paginated<BlogListRow>>> {
  const guard = await ensureAuthorAccess();
  if (!guard.session) return DENIED;

  return listBlogs({ search, page, ownerId: guard.session.user.id });
}

export async function createMyBlog(
  input: BlogSchemaValues,
): Promise<ApiResponse<BlogType>> {
  const guard = await ensureAuthorAccess();
  if (!guard.session) return DENIED;

  const parsed = blogSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid blog details.",
    };
  }

  return insertBlog(parsed.data, guard.session.user.id);
}

export async function updateMyBlog(
  id: string,
  input: BlogSchemaValues,
): Promise<ApiResponse<BlogType>> {
  const guard = await ensureAuthorAccess();
  if (!guard.session) return DENIED;

  if (!id) return { success: false, error: "Missing blog id." };

  const parsed = blogSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid blog details.",
    };
  }

  const me = guard.session.user.id;
  return updateBlogById(id, parsed.data, me, me);
}

export async function deleteMyBlog(
  id: string,
): Promise<ApiResponse<{ id: string }>> {
  const guard = await ensureAuthorAccess();
  if (!guard.session) return DENIED;

  if (!id) return { success: false, error: "Missing blog id." };

  return deleteBlogById(id, guard.session.user.id);
}
