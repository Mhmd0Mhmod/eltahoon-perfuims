"use client";

import { loginAction, logoutAction } from "@/app/(auth)/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserProfile } from "../services";
import { getCookie } from "cookies-next/client";
import { useEffect, useState } from "react";

function useAuth() {
  const [token, setToken] = useState<string | null>(null);

  const {
    data: userProfile,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["me"],
    queryFn: fetchUserProfile,
    retry: false,
    enabled: !!token,
  });
  const { mutateAsync: login, isPending: isLoginPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginAction,
    onSuccess: (data, _, __, ctx) => {
      if (!data.success) return;
      ctx.client.setQueryData(["me"], data.data.userProfile);
    },
  });
  const { mutateAsync: logout, isPending: isLogoutPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutAction,
    onSuccess: (_, __, ___, ctx) => {
      ctx.client.removeQueries({
        queryKey: ["me"],
      });
    },
  });
  useEffect(() => {
    const storedToken = getCookie("token") as string | undefined;
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
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
