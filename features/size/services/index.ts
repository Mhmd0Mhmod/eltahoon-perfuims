import { nextAPI } from "@/lib/nextAPI";
import { ISize } from "../types";

export function getAdminSizes() {
  return nextAPI.get<ISize[]>("admin/sizes");
}
