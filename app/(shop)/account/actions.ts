"use server";

import { ProfileSchema } from "@/features/account/schema";
import { nextServerAPI } from "@/lib/nextServerAPI";
import { APIResponse } from "@/types/api";
import { revalidatePath } from "next/cache";

export async function updateProfileAction(formData: ProfileSchema) {
  try {
    await nextServerAPI.patch("/users/profile", formData);
    revalidatePath("/dashboard/settings");
    return APIResponse.success<void>(undefined, "تم تحديث الملف الشخصي بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}
