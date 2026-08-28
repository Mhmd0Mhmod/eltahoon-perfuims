"use server";

import { AddCategorySchema } from "@/features/category/schema";
import { ICategory } from "@/features/category/types";
import { OfferFormValues } from "@/features/offers/schema";
import { ProductSchema } from "@/features/products/schema";
import { getProductFormData } from "@/features/products/services";
import { IProduct } from "@/features/products/types";
import { SizeSchema } from "@/features/size/schema";
import { ISize } from "@/features/size/types";
import { ICustomer } from "@/features/users/types";
import { getNextServerAPI } from "@/lib/nextServerAPI";
import { APIResponse } from "@/types/api";
import { revalidatePath } from "next/cache";
/* Categories */
export async function addCategory(data: AddCategorySchema) {
  try {
    const nextServerAPI = await getNextServerAPI();
    const response = await nextServerAPI.post<ICategory>(
      "admin/categories",
      data,
    );
    revalidatePath("/dashboard/categories");
    return APIResponse.success<ICategory>(
      response.data,
      "تمت إضافة التصنيف بنجاح",
    );
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function updateCategory(
  categoryId: number,
  data: Partial<AddCategorySchema>,
) {
  try {
    const nextServerAPI = await getNextServerAPI();
    const response = await nextServerAPI.patch<ICategory>(
      `admin/categories/${categoryId}`,
      data,
    );
    revalidatePath(`/admin/categories/${categoryId}`);
    revalidatePath("/dashboard/categories");
    return APIResponse.success<ICategory>(
      response.data,
      "تم تحديث بيانات التصنيف بنجاح",
    );
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function deleteCategory(categoryId: number) {
  try {
    const nextServerAPI = await getNextServerAPI();
    await nextServerAPI.delete(`admin/categories/${categoryId}`);
    revalidatePath("/dashboard/categories");
    return APIResponse.success<void>(undefined, "تم حذف التصنيف بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}
/* Products */
export async function getProducts({
  getAll = false,
}: { getAll?: boolean } = {}) {
  try {
    const nextServerAPI = await getNextServerAPI();
    const response = await nextServerAPI.get<IProduct[]>(`/admin/products`, {
      params: { displayAll: getAll },
    });

    return APIResponse.success({
      success: true,
      message: "تم جلب المنتجات بنجاح",
      data: response.data,
    });
  } catch (error) {
    console.error(error);
    return APIResponse.error(error);
  }
}
export async function getProductById(id: number) {
  try {
    const nextServerAPI = await getNextServerAPI();
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

export async function addProduct(data: ProductSchema) {
  try {
    const nextServerAPI = await getNextServerAPI();
    const response = await nextServerAPI.post<IProduct>(
      "admin/products",
      getProductFormData(data),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    revalidatePath("/dashboard/products");
    return APIResponse.success<IProduct>(
      response.data,
      "تم إضافة المنتج بنجاح",
    );
  } catch (error) {
    return APIResponse.error(error);
  }
}
export async function updateProduct(productId: number, data: ProductSchema) {
  try {
    const nextServerAPI = await getNextServerAPI();
    const response = await nextServerAPI.patch<IProduct>(
      `admin/products/${productId}`,
      getProductFormData(data),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    revalidatePath("/dashboard/products");
    return APIResponse.success<IProduct>(
      response.data,
      "تم تحديث بيانات المنتج بنجاح",
    );
  } catch (error) {
    return APIResponse.error(error);
  }
}
export async function deleteProduct(productId: number) {
  try {
    const nextServerAPI = await getNextServerAPI();
    await nextServerAPI.delete(`admin/products/${productId}`);
    revalidatePath("/dashboard/products");
    return APIResponse.success<void>(undefined, "تم حذف المنتج بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}
/* Sizes */

export async function addSize(data: SizeSchema) {
  try {
    const nextServerAPI = await getNextServerAPI();
    const response = await nextServerAPI.post<ISize>("admin/sizes", data);
    revalidatePath("/dashboard/sizes");
    return APIResponse.success<ISize>(response.data, "تمت إضافة الحجم بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function updateSize(sizeId: string, data: Partial<SizeSchema>) {
  try {
    const nextServerAPI = await getNextServerAPI();
    const response = await nextServerAPI.patch<ISize>(
      `admin/sizes/${sizeId}`,
      data,
    );
    revalidatePath("/dashboard/sizes");
    return APIResponse.success<ISize>(
      response.data,
      "تم تحديث بيانات الحجم بنجاح",
    );
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function deleteSize(sizeId: string) {
  try {
    const nextServerAPI = await getNextServerAPI();
    await nextServerAPI.delete(`admin/sizes/${sizeId}`);
    revalidatePath("/dashboard/sizes");
    return APIResponse.success<void>(undefined, "تم حذف الحجم بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

/* Offers */
export async function getOfferById(id: number) {
  try {
    const nextServerAPI = await getNextServerAPI();
    const response = await nextServerAPI.get(`/admin/offers/${id}`);
    return APIResponse.success({
      success: true,
      message: "تم جلب العرض بنجاح",
      data: response.data,
    });
  } catch (error) {
    return APIResponse.error({
      success: false,
      message: "حدث خطأ أثناء جلب العرض",
    });
  }
}
type TOfferValues = Omit<OfferFormValues, "startDate" | "endDate"> & {
  startDate: string;
  endDate: string;
};
export async function createOffer(data: TOfferValues) {
  try {
    const nextServerAPI = await getNextServerAPI();
    await nextServerAPI.post("admin/offers", data);
    revalidatePath("/dashboard/offers");

    return APIResponse.success<void>(undefined, "تم إنشاء العرض بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function updateOffer({
  id,
  ...data
}: {
  id: number;
  data: Partial<TOfferValues>;
}) {
  try {
    const nextServerAPI = await getNextServerAPI();
    await nextServerAPI.patch(`admin/offers/${id}`, data);
    revalidatePath(`/dashboard/offers/${id}`);
    return APIResponse.success<void>(undefined, "تم تحديث العرض بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function deleteOffer(id: number) {
  try {
    const nextServerAPI = await getNextServerAPI();
    await nextServerAPI.delete(`admin/offers/${id}`);
    revalidatePath("/dashboard/offers");
    return APIResponse.success<void>(undefined, "تم حذف العرض بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function toggleOfferStatus(id: number, isActive: boolean) {
  try {
    const nextServerAPI = await getNextServerAPI();
    await nextServerAPI.patch(`admin/offers/${id}/status`, { isActive });
    revalidatePath("/dashboard/offers");
    return APIResponse.success<void>(
      undefined,
      isActive ? "تم تفعيل العرض بنجاح" : "تم إلغاء تفعيل العرض بنجاح",
    );
  } catch (error) {
    return APIResponse.error(error);
  }
}

/* Users */
export async function getUser(id: string) {
  try {
    const nextServerAPI = await getNextServerAPI();
    const response = await nextServerAPI.get<ICustomer>(`/admin/users/${id}`);
    return APIResponse.success({
      success: true,
      message: "تم جلب بيانات المستخدم بنجاح",
      data: response.data,
    });
  } catch (error) {
    return APIResponse.error({
      success: false,
      message: "حدث خطأ أثناء جلب بيانات المستخدم",
    });
  }
}
