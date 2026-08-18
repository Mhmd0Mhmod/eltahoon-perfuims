import { fetchUserProfile, loginAction } from "@/app/(auth)/actions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

function useAuth() {
  const {
    data: userProfile,
    refetch,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["me"],
    queryFn: fetchUserProfile,
    select: (data) => (data.success ? data.data : null),
  });
  const { mutateAsync: login } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginAction,
    onSuccess: (data, _, __, context) => {
      if (data.success) {
        const { uesrProfile } = data.data;
        context.client.setQueryData(["me"], uesrProfile);
      }
    },
  });
  const { mutateAsync: logout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      cookieStore.delete("token");
      return { success: true };
    },
    onSuccess: (data, _, __, context) => {
      context.client.removeQueries({
        queryKey: ["me"],
      });
    },
  });

  useEffect(() => {
    cookieStore.get("token").then((token) => {
      if (token) {
        refetch();
      }
    });
  }, []);

  return {
    userProfile,
    refetch,
    isLoading,
    isPending,
    login,
    logout,
  };
}

export { useAuth };
