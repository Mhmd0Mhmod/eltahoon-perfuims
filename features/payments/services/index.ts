import { nextAPI } from "@/lib/nextAPI";

export async function getAdminPayments({
  params,
  pageParam,
}: {
  params?: Record<string, unknown>;
  pageParam?: number;
} = {}) {
  return nextAPI.get("/admin/payments", {
    params: { ...params, page: pageParam },
  });
}
