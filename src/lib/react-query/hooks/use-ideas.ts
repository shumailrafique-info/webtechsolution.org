import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IdeaType } from "@/drizzle/types";
import type { IdeaSchemaValues } from "@/lib/validation/zod/idea.schema";
import {
  deleteIdea,
  getIdeas,
  setIdeaRead,
  submitIdea,
} from "@/server/actions/ideas";

export const QUERY_KEY_IDEA = "ideas" as const;

/** Public: the idea box in a post's sidebar. */
export function useIdeaSubmit() {
  return useMutation({
    mutationFn: async (input: IdeaSchemaValues) => {
      const result = await submitIdea(input);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

/* ------------------------------------------------------------- dashboard */

export function useIdeas() {
  return useQuery<IdeaType[]>({
    queryKey: [QUERY_KEY_IDEA],
    queryFn: async () => {
      const result = await getIdeas();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
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
