"use server";

import { ProfileSchema } from "@/features/account/schema";
import { getNextServerAPI } from "@/lib/nextServerAPI";
import { APIResponse } from "@/types/api";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProfileAction(formData: ProfileSchema) {
  try {
    const nextServerAPI = await getNextServerAPI();
    await nextServerAPI.patch("/users/me", formData);
    revalidatePath("/dashboard/settings");
    return APIResponse.success<void>(undefined, "تم تحديث الملف الشخصي بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function deleteAccountAction() {
  try {
    const nextServerAPI = await getNextServerAPI();
    await nextServerAPI.delete("/users/me");
    return APIResponse.success<void>(undefined, "تم حذف الحساب بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}
