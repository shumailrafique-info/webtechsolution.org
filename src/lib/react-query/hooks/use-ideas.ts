import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { IdeaSchemaValues } from "@/lib/validation/zod/idea.schema";
import {
  deleteIdea,
  getIdeas,
  type IdeaFilter,
  setIdeaRead,
  submitIdea,
} from "@/server/actions/ideas";

export const QUERY_KEY_IDEA = "ideas" as const;

export function useIdeaSubmit() {
  return useMutation({
    mutationFn: async (input: IdeaSchemaValues) => {
      const result = await submitIdea(input);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

export function useIdeas(page = 1, filter: IdeaFilter = "all") {
  return useQuery({
    queryKey: [QUERY_KEY_IDEA, { page, filter }],
    queryFn: async () => {
      const result = await getIdeas(page, filter);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    placeholderData: keepPreviousData,
  });
}

export function useIdeaRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, isRead }: { id: string; isRead: boolean }) => {
      const result = await setIdeaRead(id, isRead);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_IDEA] });
    },
  });
}

export function useIdeaDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteIdea(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_IDEA] });
    },
  });
}
