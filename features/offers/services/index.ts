import { nextAPI } from "@/lib/nextAPI";

export async function getAdminOffers(
  params: Record<string, unknown>,
  pageParams: number,
) {
  return nextAPI.get("/admin/offers", {
    params: {
      ...params,
      page: pageParams,
    },
  });
}
