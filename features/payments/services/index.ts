import { nextAPI } from "@/lib/nextAPI";
import { IPagination } from "@/types/pagination";
import { IPayment } from "../types";

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

export async function getMyPayments({
  params,
  page,
}: {
  params?: Record<string, unknown>;
  page?: number;
} = {}) {
  return nextAPI.get<IPagination<IPayment>>("/payments/my", {
    params: { ...params, page },
  });
}
