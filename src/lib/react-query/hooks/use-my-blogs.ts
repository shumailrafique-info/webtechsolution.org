import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createMyBlog,
  deleteMyBlog,
  getMyBlogs,
  updateMyBlog,
} from "@/app/(author)/authors/actions";
import type { BlogSchemaValues } from "@/lib/validation/zod/blog.schema";
import type { BlogListRow } from "@/server/blog-writes";
import type { Paginated } from "@/types/global";

export const QUERY_KEY_MY_BLOGS = "my-blogs" as const;

export function useMyBlogs(search: string, page = 1, enabled = true) {
  return useQuery({
    enabled,
    queryKey: [QUERY_KEY_MY_BLOGS, { search, page }],
    queryFn: async () => {
      const result = await getMyBlogs(search, page);

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },
    placeholderData: keepPreviousData,
  });
}

export function useMyBlogCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: BlogSchemaValues) => {
      const result = await createMyBlog(input);

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_MY_BLOGS] });
    },
  });
}

export function useMyBlogUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: BlogSchemaValues;
    }) => {
      const result = await updateMyBlog(id, payload);

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_MY_BLOGS] });
    },
  });
}

export function useMyBlogDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteMyBlog(id);

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY_MY_BLOGS] });

      const previousLists = queryClient.getQueriesData<Paginated<BlogListRow>>({
        queryKey: [QUERY_KEY_MY_BLOGS],
      });

      queryClient.setQueriesData<Paginated<BlogListRow>>(
        { queryKey: [QUERY_KEY_MY_BLOGS] },
        (current) =>
          current && {
            ...current,
            rows: current.rows.filter((item) => item.id !== id),
            total: Math.max(0, current.total - 1),
          },
      );

      return { previousLists };
    },

    onError: (_error, _id, context) => {
      for (const [queryKey, data] of context?.previousLists ?? []) {
        queryClient.setQueryData(queryKey, data);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_MY_BLOGS] });
    },
  });
}
