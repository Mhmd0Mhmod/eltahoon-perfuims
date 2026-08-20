import { nextAPI } from "@/lib/nextAPI";
import { IPagination } from "@/types/pagination";
import { IOffer } from "../types";

export async function getAdminOffers({
  params,
  pageParam,
}: {
  params?: Record<string, unknown>;
  pageParam?: number;
} = {}) {
  return nextAPI.get<IPagination<IOffer>>("/admin/offers", {
    params: {
      ...params,
      page: pageParam,
    },
  });
}
export async function getOffers() {
  return nextAPI.get<IOffer[]>("/offers");
}
