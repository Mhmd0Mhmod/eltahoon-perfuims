import { nextAPI } from "@/lib/nextAPI";

export function getAdminProducts({
  params,
  pageParams,
}: {
  params?: Record<string, unknown>;
  pageParams?: number;
} = {}) {
  return nextAPI.get("admin/products", {
    params: {
      ...params,
      page: pageParams,
    },
  });
}
