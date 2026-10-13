import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type BlogCategoryListItem,
  deleteBlogCategory,
  getBlogCategories,
} from "@/app/(admin)/admin/categories/actions";
import {
  createBlogCategory,
  updateBlogCategory,
} from "@/app/(admin)/admin/categories/new/actions";
import type { BlogCategorySchemaValues } from "@/lib/validation/zod/blog-category.schema";

export const QUERY_KEY_BLOG_CATEGORIES = "blog-categories" as const;

export function useBlogCategories() {
  return useQuery({
    queryKey: [QUERY_KEY_BLOG_CATEGORIES],
    queryFn: async () => {
      const result = await getBlogCategories();

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },
  });
}

export function useBlogCategoryCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: BlogCategorySchemaValues) => {
      const result = await createBlogCategory(input);

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_BLOG_CATEGORIES],
      });
    },
  });
}

export function useBlogCategoryUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: BlogCategorySchemaValues;
    }) => {
      const result = await updateBlogCategory(id, payload);

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },

    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY_BLOG_CATEGORIES],
      });

      const previous = queryClient.getQueryData<BlogCategoryListItem[]>([
        QUERY_KEY_BLOG_CATEGORIES,
      ]);

      queryClient.setQueryData<BlogCategoryListItem[]>(
        [QUERY_KEY_BLOG_CATEGORIES],
        (current) =>
          current?.map((item) =>
            item.id === id ? { ...item, ...payload } : item,
          ),
      );

      return { previous };
    },

    onError: (_error, _input, context) => {
      if (context?.previous) {
        queryClient.setQueryData([QUERY_KEY_BLOG_CATEGORIES], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_BLOG_CATEGORIES],
      });
    },
  });
}

export function useBlogCategoryDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteBlogCategory(id);

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },

    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY_BLOG_CATEGORIES],
      });

      const previous = queryClient.getQueryData<BlogCategoryListItem[]>([
        QUERY_KEY_BLOG_CATEGORIES,
      ]);

      queryClient.setQueryData<BlogCategoryListItem[]>(
        [QUERY_KEY_BLOG_CATEGORIES],
        (current) => current?.filter((item) => item.id !== id),
      );

      return { previous };
    },

    onError: (_error, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData([QUERY_KEY_BLOG_CATEGORIES], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_BLOG_CATEGORIES],
      });
    },
  });
}
