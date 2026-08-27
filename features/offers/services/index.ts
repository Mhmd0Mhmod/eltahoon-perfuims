import { nextAPI } from "@/lib/nextAPI";
import { IOffer } from "../types";

export async function getAdminOffers({
  ...params
}: Record<string, unknown> = {}) {
  return nextAPI.get<IOffer[]>("/admin/offers", {
    params: {
      ...params,
    },
  });
}
export async function getOffers() {
  return nextAPI.get<IOffer[]>("/offers");
}
