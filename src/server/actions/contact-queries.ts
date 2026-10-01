"use server";

import { count, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/drizzle/db";
import { contactQuery } from "@/drizzle/schema";
import type { ContactQueryType } from "@/drizzle/types";
import { ensureAdminAccess } from "@/lib/auth/guards";
import {
  type ContactQuerySchemaValues,
  contactQuerySchema,
} from "@/lib/validation/zod/contact-query.schema";
import {
  ADMIN_PAGE_SIZE,
  type ApiResponse,
  type Paginated,
} from "@/types/global";

export async function submitContactQuery(
  input: ContactQuerySchemaValues,
): Promise<ApiResponse<{ id: string }>> {
  const parsed = contactQuerySchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Please check the form and try again." };
  }

  try {
    const [row] = await db
      .insert(contactQuery)
      .values(parsed.data)
      .returning({ id: contactQuery.id });

    revalidatePath("/admin/queries");
    revalidatePath("/admin");

    return { success: true, data: { id: row.id } };
  } catch (error) {
    console.error("submitContactQuery failed", error);
    return {
      success: false,
      error: "Could not send your message. Please try again.",
    };
  }
}

export type ContactQueryFilter = "all" | "unread";

export async function getContactQueries(
  page = 1,
  filter: ContactQueryFilter = "all",
): Promise<ApiResponse<Paginated<ContactQueryType> & { unread: number }>> {
  const guard = await ensureAdminAccess();
  if (!guard.session) {
    return { success: false, error: "Admin access required." };
  }

  const current = Math.max(1, Math.trunc(page));
  const where =
    filter === "unread" ? eq(contactQuery.is_read, false) : undefined;

  try {
    const [rows, [counted], [unreadCount]] = await Promise.all([
      db
        .select()
        .from(contactQuery)
        .where(where)
        .orderBy(desc(contactQuery.created_at))
        .limit(ADMIN_PAGE_SIZE)
        .offset((current - 1) * ADMIN_PAGE_SIZE),

      db.select({ total: count() }).from(contactQuery).where(where),

      db
        .select({ total: count() })
        .from(contactQuery)
        .where(eq(contactQuery.is_read, false)),
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
    console.error("getContactQueries failed", error);
    return { success: false, error: "Could not load queries." };
  }
}

export async function setContactQueryRead(
  id: string,
  isRead: boolean,
): Promise<ApiResponse<{ id: string }>> {
  const guard = await ensureAdminAccess();
  if (!guard.session) {
    return { success: false, error: "Admin access required." };
  }

  try {
    const [row] = await db
      .update(contactQuery)
      .set({ is_read: isRead })
      .where(eq(contactQuery.id, id))
      .returning({ id: contactQuery.id });

    if (!row) return { success: false, error: "That query no longer exists." };

    revalidatePath("/admin/queries");
    revalidatePath("/admin");

    return { success: true, data: { id: row.id } };
  } catch (error) {
    console.error("setContactQueryRead failed", error);
    return { success: false, error: "Could not update that query." };
  }
}

export async function deleteContactQuery(
  id: string,
): Promise<ApiResponse<{ id: string }>> {
  const guard = await ensureAdminAccess();
  if (!guard.session) {
    return { success: false, error: "Admin access required." };
  }

  try {
    const [row] = await db
      .delete(contactQuery)
      .where(eq(contactQuery.id, id))
      .returning({ id: contactQuery.id });

    if (!row) return { success: false, error: "That query no longer exists." };

    revalidatePath("/admin/queries");
    revalidatePath("/admin");

    return { success: true, data: { id: row.id } };
  } catch (error) {
    console.error("deleteContactQuery failed", error);
    return { success: false, error: "Could not delete that query." };
  }
}
