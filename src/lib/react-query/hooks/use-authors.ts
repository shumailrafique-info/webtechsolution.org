import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type AuthorListItem,
  deleteAuthor,
  getAuthors,
} from "@/app/(admin)/admin/authors/actions";
import {
  createAuthor,
  updateAuthor,
} from "@/app/(admin)/admin/authors/new/actions";
import type { AuthorSchemaValues } from "@/lib/validation/zod/author.schema";

export const QUERY_KEY_AUTHORS = "authors" as const;

export function useAuthors() {
  return useQuery({
    queryKey: [QUERY_KEY_AUTHORS],
    queryFn: async () => {
      const result = await getAuthors();

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },
  });
}

export function useAuthorCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: AuthorSchemaValues) => {
      const result = await createAuthor(input);

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_AUTHORS] });
    },
  });
}

export function useAuthorUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: AuthorSchemaValues;
    }) => {
      const result = await updateAuthor(id, payload);

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_AUTHORS] });
    },
  });
}

export function useAuthorDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteAuthor(id);

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY_AUTHORS] });

      const previous = queryClient.getQueryData<AuthorListItem[]>([
        QUERY_KEY_AUTHORS,
      ]);

      queryClient.setQueryData<AuthorListItem[]>(
        [QUERY_KEY_AUTHORS],
        (current) => current?.filter((item) => item.id !== id),
      );

      return { previous };
    },

    onError: (_error, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData([QUERY_KEY_AUTHORS], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_AUTHORS] });
    },
  });
}
