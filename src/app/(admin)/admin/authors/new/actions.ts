"use server";

import { and, eq } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { blog, user } from "@/drizzle/schema";
import { ensureAdminAccess } from "@/lib/auth/guards";
import { auth } from "@/lib/auth/server";
import {
  type AuthorPasswordSchemaValues,
  type AuthorSchemaValues,
  authorPasswordSchema,
  authorSchema,
  type NewAuthorSchemaValues,
  newAuthorSchema,
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

function profile(values: AuthorSchemaValues) {
  const avatar = values.image[0] ?? null;
  return {
    name: values.name,
    email: values.email,
    bio: values.bio,
    avatar,
    image: avatar?.url ?? null,
  };
}

async function findAuthor(id: string) {
  const [row] = await db
    .select({ id: user.id })
    .from(user)
    .where(and(eq(user.id, id), eq(user.role, "author")))
    .limit(1);
  return row ?? null;
}

async function authorPostSlugs(id: string) {
  const posts = await db
    .select({ slug: blog.slug })
    .from(blog)
    .where(eq(blog.author_id, id));
  return posts.map((post) => post.slug);
}

export async function createAuthor(
  input: NewAuthorSchemaValues,
): Promise<ApiResponse<{ id: string }>> {
  const guard = await ensureAdminAccess();
  if (!guard.session) {
    return { success: false, error: "Admin access required." };
  }

  const parsed = newAuthorSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid author details.",
    };
  }

  const ctx = await auth.$context;
  const existing = await ctx.internalAdapter.findUserByEmail(parsed.data.email);
  if (existing) {
    return {
      success: false,
      error: `The email "${parsed.data.email}" is already in use.`,
    };
  }

  const { avatar, bio, ...base } = profile(parsed.data);
  const created = await ctx.internalAdapter.createUser({
    ...base,
    emailVerified: false,
    role: "author",
  });

  try {
    await db.update(user).set({ bio, avatar }).where(eq(user.id, created.id));
    await ctx.internalAdapter.linkAccount({
      userId: created.id,
      providerId: "credential",
      accountId: created.id,
      password: await ctx.password.hash(parsed.data.password),
    });
  } catch (error) {
    await db.delete(user).where(eq(user.id, created.id));
    console.error("createAuthor failed", error);
    return { success: false, error: "Could not create the author." };
  }

  return { success: true, data: { id: created.id } };
}

export async function updateAuthor(
  id: string,
  input: AuthorSchemaValues,
): Promise<ApiResponse<{ id: string }>> {
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
      .update(user)
      .set(profile(parsed.data))
      .where(and(eq(user.id, id), eq(user.role, "author")))
      .returning({ id: user.id });

    if (!updated) {
      return { success: false, error: "That author no longer exists." };
    }

    revalidateAuthorPosts(await authorPostSlugs(id));
    return { success: true, data: updated };
  } catch (error) {
    if (isUniqueViolation(error)) {
      return {
        success: false,
        error: `The email "${parsed.data.email}" is already in use.`,
      };
    }
    console.error("updateAuthor failed", error);
    return { success: false, error: "Could not update the author." };
  }
}

export async function resetAuthorPassword(
  id: string,
  input: AuthorPasswordSchemaValues,
): Promise<ApiResponse<{ id: string }>> {
  const guard = await ensureAdminAccess();
  if (!guard.session) {
    return { success: false, error: "Admin access required." };
  }

  const parsed = authorPasswordSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid password.",
    };
  }

  if (!(await findAuthor(id))) {
    return { success: false, error: "That author no longer exists." };
  }

  try {
    const ctx = await auth.$context;
    const hash = await ctx.password.hash(parsed.data.password);
    const accounts = await ctx.internalAdapter.findAccounts(id);

    if (accounts.some((account) => account.providerId === "credential")) {
      await ctx.internalAdapter.updatePassword(id, hash);
    } else {
      await ctx.internalAdapter.linkAccount({
        userId: id,
        providerId: "credential",
        accountId: id,
        password: hash,
      });
    }

    await ctx.internalAdapter.deleteUserSessions(id);
    return { success: true, data: { id } };
  } catch (error) {
    console.error("resetAuthorPassword failed", error);
    return { success: false, error: "Could not reset the password." };
  }
}
