"use server";

import { and, asc, count, eq } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { blog, user } from "@/drizzle/schema";
import { ensureAdminAccess } from "@/lib/auth/guards";
import { revalidateAuthorPosts } from "@/server/revalidate";
import type { ApiResponse } from "@/types/global";

export type AuthorListItem = {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatar: typeof user.$inferSelect.avatar;
  posts: number;
};

export async function getAuthors(): Promise<ApiResponse<AuthorListItem[]>> {
  const guard = await ensureAdminAccess();
  if (!guard.session) {
    return { success: false, error: "Admin access required." };
  }

  try {
    const rows = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        avatar: user.avatar,
        posts: count(blog.id),
      })
      .from(user)
      .leftJoin(blog, eq(blog.author_id, user.id))
      .where(eq(user.role, "author"))
      .groupBy(user.id)
      .orderBy(asc(user.name));

    return { success: true, data: rows };
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
      .delete(user)
      .where(and(eq(user.id, id), eq(user.role, "author")))
      .returning({ id: user.id });

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
