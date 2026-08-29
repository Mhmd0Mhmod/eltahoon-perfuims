import { nextAPI } from "@/lib/nextAPI";

export async function getAdminOfferCoupons({
  params,
  pageParam,
}: {
  params?: Record<string, unknown>;
  pageParam?: number;
} = {}) {
  return nextAPI.get("/admin/coupons", {
    params: {
      ...params,
      page: pageParam,
    },
  });
}
