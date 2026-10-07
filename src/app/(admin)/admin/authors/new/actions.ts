"use server";

import { eq } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { author, blog } from "@/drizzle/schema";
import type { AuthorType } from "@/drizzle/types";
import { ensureAdminAccess } from "@/lib/auth/guards";
import {
  type AuthorSchemaValues,
  authorSchema,
} from "@/lib/validation/zod/author.schema";
import { revalidateAuthorPosts } from "@/server/revalidate";
import type { ApiResponse } from "@/types/global";

function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as { code?: unknown }).code === "23505"
  );
}

function toRow(values: AuthorSchemaValues) {
  return {
    name: values.name,
    slug: values.slug,
    bio: values.bio,
    image: values.image[0] ?? null,
  };
}

export async function createAuthor(
  input: AuthorSchemaValues,
): Promise<ApiResponse<AuthorType>> {
  const guard = await ensureAdminAccess();
  if (!guard.session) {
    return { success: false, error: "Admin access required." };
  }

  const parsed = authorSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid author details.",
    };
  }

  try {
    const [created] = await db
      .insert(author)
      .values(toRow(parsed.data))
      .returning();
    return { success: true, data: created };
  } catch (error) {
    if (isUniqueViolation(error)) {
      return {
        success: false,
        error: `The slug "${parsed.data.slug}" is already in use.`,
      };
    }
    console.error("createAuthor failed", error);
    return { success: false, error: "Could not create the author." };
  }
}

export async function updateAuthor(
  id: string,
  input: AuthorSchemaValues,
): Promise<ApiResponse<AuthorType>> {
  const guard = await ensureAdminAccess();
  if (!guard.session) {
    return { success: false, error: "Admin access required." };
  }

  const parsed = authorSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid author details.",
    };
  }

  try {
    const [updated] = await db
      .update(author)
      .set(toRow(parsed.data))
      .where(eq(author.id, id))
      .returning();

    if (!updated) {
      return { success: false, error: "That author no longer exists." };
    }

    const posts = await db
      .select({ slug: blog.slug })
      .from(blog)
      .where(eq(blog.author_id, id));
    revalidateAuthorPosts(posts.map((post) => post.slug));

    return { success: true, data: updated };
  } catch (error) {
    if (isUniqueViolation(error)) {
      return {
        success: false,
        error: `The slug "${parsed.data.slug}" is already in use.`,
      };
    }
    console.error("updateAuthor failed", error);
    return { success: false, error: "Could not update the author." };
  }
}
