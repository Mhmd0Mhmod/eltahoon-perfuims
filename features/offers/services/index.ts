import { nextAPI } from "@/lib/nextAPI";

export async function getAdminOffers({
  params,
  pageParam,
}: {
  params?: Record<string, unknown>;
  pageParam?: number;
} = {}) {
  return nextAPI.get("/admin/offers", {
    params: {
      ...params,
      page: pageParam,
    },
  });
}
