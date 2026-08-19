"use client";

import { loginAction, logoutAction } from "@/app/(auth)/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserProfile } from "../services";

function useAuth() {
  const queryClient = useQueryClient();

  const {
    data: userProfile,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["me"],
    queryFn: fetchUserProfile,
    retry: false,
  });
  const { mutateAsync: login, isPending: isLoginPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginAction,
    onSuccess: (data) => {
      if (!data.success) return;

      queryClient.setQueryData(["me"], data.data.userProfile);
    },
  });

  const { mutateAsync: logout, isPending: isLogoutPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutAction,

    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["me"],
      });
    },
  });
  return {
    userProfile,
    isLoading,
    isFetching,
    isLoginPending,
    isLogoutPending,
    refetch,
    login,
    logout,
    isAuthenticated: !!userProfile,
  };
}

export { useAuth };
