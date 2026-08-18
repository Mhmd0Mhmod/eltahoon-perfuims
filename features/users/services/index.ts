import { nextAPI } from "@/lib/nextAPI";

export async function getAdminUsers({
  params,
  pageParam,
}: {
  params?: Record<string, unknown>;
  pageParam?: number;
} = {}) {
  return nextAPI.get(`/admin/users`, {
    params: {
      ...params,
      page: pageParam,
    },
  });
}
