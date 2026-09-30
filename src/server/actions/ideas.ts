"use server";

import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/drizzle/db";
import { blog, idea } from "@/drizzle/schema";
import type { IdeaType } from "@/drizzle/types";
import { ensureAdminAccess } from "@/lib/auth/guards";
import {
  type IdeaSchemaValues,
  ideaSchema,
} from "@/lib/validation/zod/idea.schema";
import type { ApiResponse } from "@/types/global";

/**
 * Submitting an idea is open to any visitor, so this action validates the
 * payload itself rather than trusting the form, and stores only the three
 * fields the form collects. Reading, marking and deleting are admin-only.
 */
export async function submitIdea(
  input: IdeaSchemaValues,
): Promise<ApiResponse<{ id: string }>> {
  const parsed = ideaSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Please check the form and try again." };
  }

  const { name, email, message, blogId } = parsed.data;

  try {
    // The post's title and slug are copied in, so a submission still reads
    // sensibly if that post is later renamed or removed.
    const post = blogId
      ? await db.query.blog.findFirst({
          where: eq(blog.id, blogId),
          columns: { id: true, title: true, slug: true },
        })
      : undefined;

    const [row] = await db
      .insert(idea)
      .values({
        name,
        email,
        message,
        blog_id: post?.id ?? null,
        blog_title: post?.title ?? null,
        blog_slug: post?.slug ?? null,
      })
      .returning({ id: idea.id });

    revalidatePath("/admin/ideas");
    revalidatePath("/admin");

    return { success: true, data: { id: row.id } };
  } catch (error) {
    console.error("submitIdea failed", error);
    return { success: false, error: "Could not send your idea. Try again." };
  }
}

export async function getIdeas(): Promise<ApiResponse<IdeaType[]>> {
  const guard = await ensureAdminAccess();
  if (!guard.session) {
    return { success: false, error: "Admin access required." };
  }

  try {
    const rows = await db.select().from(idea).orderBy(desc(idea.created_at));
    return { success: true, data: rows };
  } catch (error) {
    console.error("getIdeas failed", error);
    return { success: false, error: "Could not load ideas." };
  }
}

export async function setIdeaRead(
  id: string,
  isRead: boolean,
): Promise<ApiResponse<{ id: string }>> {
  const guard = await ensureAdminAccess();
  if (!guard.session) {
    return { success: false, error: "Admin access required." };
  }

  try {
    const [row] = await db
      .update(idea)
      .set({ is_read: isRead })
      .where(eq(idea.id, id))
      .returning({ id: idea.id });

    if (!row) return { success: false, error: "That idea no longer exists." };

    revalidatePath("/admin/ideas");
    revalidatePath("/admin");

    return { success: true, data: { id: row.id } };
  } catch (error) {
    console.error("setIdeaRead failed", error);
    return { success: false, error: "Could not update that idea." };
  }
}

export async function deleteIdea(
  id: string,
): Promise<ApiResponse<{ id: string }>> {
  const guard = await ensureAdminAccess();
  if (!guard.session) {
    return { success: false, error: "Admin access required." };
  }

  try {
    const [row] = await db
      .delete(idea)
      .where(eq(idea.id, id))
      .returning({ id: idea.id });

    if (!row) return { success: false, error: "That idea no longer exists." };

    revalidatePath("/admin/ideas");
    revalidatePath("/admin");

    return { success: true, data: { id: row.id } };
  } catch (error) {
    console.error("deleteIdea failed", error);
    return { success: false, error: "Could not delete that idea." };
  }
}
