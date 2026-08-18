import { nextAPI } from "@/lib/nextAPI";

export async function getAdminOfferCoupons(
  params: Record<string, unknown>,
  pageParams: number,
) {
  return nextAPI.get("/admin/coupons", {
    params: {
      ...params,
      page: pageParams,
    },
  });
}
