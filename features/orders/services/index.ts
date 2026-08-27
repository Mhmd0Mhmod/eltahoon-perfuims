import { nextAPI } from "@/lib/nextAPI";
import { IPagination, TPaginationParams } from "@/types/pagination";
import { IOrder, IOrderSearchParams } from "../types";

export async function fetchAdminOrders({
  params,
  page,
}: {
  params?: Record<string, unknown> | IOrderSearchParams;
  page?: number;
} = {}) {
  return nextAPI.get(`/admin/orders`, {
    params: {
      ...params,
      page,
    },
  });
}
export async function getUserOrders({
  params,
  page,
}: {
  params?: Record<string, unknown> | IOrderSearchParams;
  page?: number;
} = {}) {
  return nextAPI.get<IPagination<IOrder>>(`/orders`, {
    params: {
      ...params,
      page,
    },
  });
}
