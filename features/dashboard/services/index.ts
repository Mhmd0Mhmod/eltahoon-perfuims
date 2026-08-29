import { nextAPI } from "@/lib/nextAPI";
import { AxiosResponse } from "axios";
import { IDashboardStats } from "../types";

export async function getAdminDashboardStats(
  year: number,
): Promise<AxiosResponse<IDashboardStats>> {
  return nextAPI.get("/admin/dashboard/stats", {
    params: { year },
  });
}
