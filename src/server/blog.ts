import "server-only";
import { and, eq } from "drizzle-orm";
import { cache } from "react";
import { db } from "@/drizzle/db";
import { blog } from "@/drizzle/schema";
import type { BlogAuthor, BlogType } from "@/drizzle/types";

export type PublishedPost = BlogType & { author: BlogAuthor | null };

export const getPublishedPost = cache(
  async (slug: string): Promise<PublishedPost | null> => {
    const post = await db.query.blog.findFirst({
      where: and(eq(blog.slug, slug), eq(blog.status, "PUBLISHED")),
      with: {
        author: { columns: { id: true, name: true, image: true } },
      },
    });

    return post ?? null;
  },
);
