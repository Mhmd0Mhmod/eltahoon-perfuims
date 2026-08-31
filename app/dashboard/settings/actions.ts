"use server";

import { StoreSettingsSchema } from "@/features/settings/schema";
import { ISiteSettings } from "@/features/settings/types";
import { getNextServerAPI } from "@/lib/nextServerAPI";
import { APIResponse, IAPIResponse } from "@/types/api";
import { revalidatePath } from "next/cache";

export async function getSiteSettings(): Promise<
  IAPIResponse<ISiteSettings>
> {
  try {
    const nextServerAPI = await getNextServerAPI();
    const response = await nextServerAPI.get<ISiteSettings>("/settings");
    return APIResponse.success(response.data);
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function updateSiteSettings(
  data: StoreSettingsSchema,
): Promise<IAPIResponse<ISiteSettings>> {
  try {
    const nextServerAPI = await getNextServerAPI();
    const response = await nextServerAPI.put<ISiteSettings>(
      "/admin/settings",
      data,
    );
    revalidatePath("/dashboard/settings");
    return APIResponse.success(response.data, "تم حفظ الإعدادات بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}
