import { nextAPI } from "@/lib/nextAPI";
import { IPagination, TPaginationParams } from "@/types/pagination";
import { IOrder, IOrderSearchParams } from "../types";

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
export async function getUserOrders({
  params,
  pageParam,
}: {
  params?: Record<string, unknown> | IOrderSearchParams;
  pageParam?: number;
} = {}) {
  return nextAPI.get<IPagination<IOrder>>(`/orders`, {
    params: {
      ...params,
      page: pageParam,
    },
  });
}
