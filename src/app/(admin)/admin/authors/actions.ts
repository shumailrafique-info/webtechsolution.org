"use server";

import { asc, count, eq } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { author, blog } from "@/drizzle/schema";
import type { AuthorType } from "@/drizzle/types";
import { ensureAdminAccess } from "@/lib/auth/guards";
import { revalidateAuthorPosts } from "@/server/revalidate";
import type { ApiResponse } from "@/types/global";

export type AuthorListItem = AuthorType & { posts: number };

export async function getAuthors(): Promise<ApiResponse<AuthorListItem[]>> {
  const guard = await ensureAdminAccess();
  if (!guard.session) {
    return { success: false, error: "Admin access required." };
  }

  try {
    const rows = await db
      .select({ author, posts: count(blog.id) })
      .from(author)
      .leftJoin(blog, eq(blog.author_id, author.id))
      .groupBy(author.id)
      .orderBy(asc(author.name));

    return {
      success: true,
      data: rows.map((row) => ({ ...row.author, posts: row.posts })),
    };
  } catch (error) {
    console.error("getAuthors failed", error);
    return { success: false, error: "Could not load authors." };
  }
}

export async function deleteAuthor(
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
      .where(eq(blog.author_id, id));

    const [deleted] = await db
      .delete(author)
      .where(eq(author.id, id))
      .returning({ id: author.id });

    if (!deleted) {
      return { success: false, error: "That author no longer exists." };
    }

    revalidateAuthorPosts(posts.map((post) => post.slug));
    return { success: true, data: { id: deleted.id } };
  } catch (error) {
    console.error("deleteAuthor failed", error);
    return { success: false, error: "Could not delete the author." };
  }
}
