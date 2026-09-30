"use server";

import { count, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/drizzle/db";
import { blog, idea } from "@/drizzle/schema";
import type { IdeaType } from "@/drizzle/types";
import { ensureAdminAccess } from "@/lib/auth/guards";
import {
  type IdeaSchemaValues,
  ideaSchema,
} from "@/lib/validation/zod/idea.schema";
import {
  ADMIN_PAGE_SIZE,
  type ApiResponse,
  type Paginated,
} from "@/types/global";

export async function submitIdea(
  input: IdeaSchemaValues,
): Promise<ApiResponse<{ id: string }>> {
  const parsed = ideaSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Please check the form and try again." };
  }

  const { name, email, message, blogId } = parsed.data;

  try {
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

export type IdeaFilter = "all" | "unread";

export async function getIdeas(
  page = 1,
  filter: IdeaFilter = "all",
): Promise<ApiResponse<Paginated<IdeaType> & { unread: number }>> {
  const guard = await ensureAdminAccess();
  if (!guard.session) {
    return { success: false, error: "Admin access required." };
  }

  const current = Math.max(1, Math.trunc(page));
  const where = filter === "unread" ? eq(idea.is_read, false) : undefined;

  try {
    const [rows, [counted], [unreadCount]] = await Promise.all([
      db
        .select()
        .from(idea)
        .where(where)
        .orderBy(desc(idea.created_at))
        .limit(ADMIN_PAGE_SIZE)
        .offset((current - 1) * ADMIN_PAGE_SIZE),

      db.select({ total: count() }).from(idea).where(where),

      db.select({ total: count() }).from(idea).where(eq(idea.is_read, false)),
    ]);

    const total = counted?.total ?? 0;

    return {
      success: true,
      data: {
        rows,
        total,
        page: current,
        totalPages: Math.max(1, Math.ceil(total / ADMIN_PAGE_SIZE)),
        unread: unreadCount?.total ?? 0,
      },
    };
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
