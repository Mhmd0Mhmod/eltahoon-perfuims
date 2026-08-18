"use server";

import { AddCategorySchema } from "@/features/category/schema";
import { nextServerAPI } from "@/lib/nextServerAPI";
import { APIResponse } from "@/types/api";

export async function addCategory(data: AddCategorySchema) {}
export async function updateCategory(id: number, data: AddCategorySchema) {}
export async function getProductById(id: number) {
  try {
    const response = await nextServerAPI.get(`/admin/products/${id}`);
    return APIResponse.success({
      success: true,
      message: "تم جلب المنتج بنجاح",
      data: response.data,
    });
  } catch (error) {
    return APIResponse.error({
      success: false,
      message: "حدث خطأ أثناء جلب المنتج",
    });
  }
}
