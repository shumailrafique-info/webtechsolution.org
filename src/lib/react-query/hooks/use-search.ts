import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSearchSuggestions } from "@/server/actions/search";

export const QUERY_KEY_SEARCH = "search-suggestions" as const;

export function useSearchSuggestions(query: string) {
  const term = query.trim();

  return useQuery({
    queryKey: [QUERY_KEY_SEARCH, term.toLowerCase()],
    queryFn: async () => {
      const result = await getSearchSuggestions(term);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: term.length >= 2,
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });
}
