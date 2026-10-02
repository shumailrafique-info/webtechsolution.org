"use server";

import { count, desc, eq, ilike, or } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { blog } from "@/drizzle/schema";
import type { BlogType } from "@/drizzle/types";
import { ensureAdminAccess } from "@/lib/auth/guards";
import { revalidateBlogContent } from "@/server/revalidate";
import {
  ADMIN_PAGE_SIZE,
  type ApiResponse,
  type Paginated,
} from "@/types/global";

const LIKE_ESCAPE = "\\";

function escapeLikeTerm(term: string) {
  return term.replace(/[\\%_]/g, (match) => `${LIKE_ESCAPE}${match}`);
}

export async function getBlogs(
  search?: string,
  page = 1,
): Promise<ApiResponse<Paginated<BlogType>>> {
  const guard = await ensureAdminAccess();
  if (!guard.session) {
    return { success: false, error: "Admin access required." };
  }

  const term = search?.trim();
  const current = Math.max(1, Math.trunc(page));

  const filter = term
    ? or(
        ilike(blog.title, `%${escapeLikeTerm(term)}%`),
        ilike(blog.slug, `%${escapeLikeTerm(term)}%`),
      )
    : undefined;

  try {
    const [rows, [counted]] = await Promise.all([
      db
        .select()
        .from(blog)
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
    console.error("getBlogs failed", error);
    return { success: false, error: "Could not load blog posts." };
  }
}

export async function deleteBlog(
  id: string,
): Promise<ApiResponse<{ id: string }>> {
  const guard = await ensureAdminAccess();
  if (!guard.session) {
    return { success: false, error: "Admin access required." };
  }

  if (!id) {
    return { success: false, error: "Missing blog id." };
  }

  try {
    const [deleted] = await db
      .delete(blog)
      .where(eq(blog.id, id))
      .returning({ id: blog.id, slug: blog.slug });

    if (!deleted) {
      return { success: false, error: "That blog post no longer exists." };
    }

    revalidateBlogContent(deleted.slug);

    return { success: true, data: { id: deleted.id } };
  } catch (error) {
    console.error("deleteBlog failed", error);
    return { success: false, error: "Could not delete the blog post." };
  }
}
