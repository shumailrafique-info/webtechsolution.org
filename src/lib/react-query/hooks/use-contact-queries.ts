import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { ContactQuerySchemaValues } from "@/lib/validation/zod/contact-query.schema";
import {
  type ContactQueryFilter,
  deleteContactQuery,
  getContactQueries,
  setContactQueryRead,
  submitContactQuery,
} from "@/server/actions/contact-queries";

export const QUERY_KEY_CONTACT_QUERY = "contact-queries" as const;

export function useContactQuerySubmit() {
  return useMutation({
    mutationFn: async (input: ContactQuerySchemaValues) => {
      const result = await submitContactQuery(input);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

export function useContactQueries(
  page = 1,
  filter: ContactQueryFilter = "all",
) {
  return useQuery({
    queryKey: [QUERY_KEY_CONTACT_QUERY, { page, filter }],
    queryFn: async () => {
      const result = await getContactQueries(page, filter);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    placeholderData: keepPreviousData,
  });
}

export function useContactQueryRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, isRead }: { id: string; isRead: boolean }) => {
      const result = await setContactQueryRead(id, isRead);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_CONTACT_QUERY] });
    },
  });
}

export function useContactQueryDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteContactQuery(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_CONTACT_QUERY] });
    },
  });
}
