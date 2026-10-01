"use server";

import type { BlogCard } from "@/server/blog";
import {
  normalizeQuery,
  SEARCH_MIN_LENGTH,
  searchPublishedPosts,
} from "@/server/search";
import type { ApiResponse } from "@/types/global";

export type SearchSuggestion = Pick<
  BlogCard,
  "id" | "title" | "slug" | "cover_image" | "image_alt" | "published_at"
>;

export async function getSearchSuggestions(
  input: string,
): Promise<ApiResponse<{ hits: SearchSuggestion[]; total: number }>> {
  const query = normalizeQuery(input);
  if (query.length < SEARCH_MIN_LENGTH) {
    return { success: true, data: { hits: [], total: 0 } };
  }

  try {
    const { hits, total } = await searchPublishedPosts({ query, limit: 5 });
    return {
      success: true,
      data: {
        hits: hits.map(({ excerpt: _excerpt, ...hit }) => hit),
        total,
      },
    };
  } catch (error) {
    console.error("getSearchSuggestions failed", error);
    return { success: false, error: "Search is unavailable right now." };
  }
}
