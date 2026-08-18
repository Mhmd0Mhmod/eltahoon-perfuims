import { nextAPI } from "@/lib/nextAPI";
import { IOrderSearchParams } from "../types";

export async function fetchAdminOrders({
  params,
  pageParam,
}: {
  params?: Record<string, unknown> | IOrderSearchParams;
  pageParam?: number;
} = {}) {
  return nextAPI.get(`/admin/orders`, {
    params: {
      ...params,
      page: pageParam,
    },
  });
}
