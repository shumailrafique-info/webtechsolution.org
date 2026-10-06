import { authClient } from "../client";

export const useAuth = () => {
  const {
    data: session,
    isPending,
    error,
    isRefetching,
    refetch,
  } = authClient.useSession();

  const user = session?.user ?? null;

  return {
    session,
    user,
    isLoading: isPending,
    isPending,
    isRefetching,
    isAuthenticated: !!user,
    isGuest: !user && !isPending,
    error,
    hasError: !!error,
    refetchSession: refetch,
  };
};
