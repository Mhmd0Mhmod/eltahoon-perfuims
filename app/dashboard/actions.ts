"use server";

import { AddCategorySchema } from "@/features/category/schema";
import { CouponFormValues } from "@/features/coupons/schema";
import { ICategory } from "@/features/category/types";
import { OfferFormValues } from "@/features/offers/schema";
import { ProductSchema } from "@/features/products/schema";
import { getProductFormData } from "@/features/products/services";
import { IProduct } from "@/features/products/types";
import { SizeSchema } from "@/features/size/schema";
import { ISize } from "@/features/size/types";
import { ICustomer } from "@/features/users/types";
import { getNextServerAPI } from "@/lib/nextServerAPI";
import { APIResponse, IAPIResponse } from "@/types/api";
import { revalidatePath } from "next/cache";
import { IOrder } from "@/features/orders/types";
import { IOfferCoupon } from "@/features/offers/types";

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
    await nextServerAPI.patch(`admin/offers/${id}`, { isActive });
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
/* Orders */
// add to existing imports at top

// add anywhere near the other GET-by-id actions
export async function getOrderById(id: string) {
  try {
    const nextServerAPI = await getNextServerAPI();
    const response = await nextServerAPI.get<IOrder>(`/admin/orders/${id}`);
    return APIResponse.success({
      success: true,
      message: "تم جلب الطلب بنجاح",
      data: response.data,
    });
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function updateOrderStatus(
  orderId: number,
  status: string,
): Promise<IAPIResponse<void>> {
  try {
    const nextServerAPI = await getNextServerAPI();
    await nextServerAPI.patch(`/admin/orders/${orderId}/status`, undefined, {
      params: { status },
    });
    revalidatePath(`/dashboard/orders/${orderId}`);
    return APIResponse.success<void>(undefined, "تم تحديث حالة الطلب بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function updatePaymentStatus(
  orderId: number,
  status: string,
  transactionId?: string,
): Promise<IAPIResponse<void>> {
  try {
    const nextServerAPI = await getNextServerAPI();
    await nextServerAPI.patch(
      `/admin/payments/${orderId}/status`,
      undefined,
      {
        params: {
          status,
          ...(transactionId ? { transactionId } : {}),
        },
      },
    );
    revalidatePath(`/dashboard/orders/${orderId}`);
    return APIResponse.success<void>(undefined, "تم تحديث حالة الدفع بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

/* Coupons */
type TCouponPayload = Omit<CouponFormValues, "expiresAt"> & {
  expiresAt: string;
};
export async function createCoupon(data: TCouponPayload) {
  try {
    const nextServerAPI = await getNextServerAPI();
    await nextServerAPI.post<IOfferCoupon>("/admin/coupons", data);
    revalidatePath("/dashboard/coupons");
    return APIResponse.success<void>(undefined, "تم إنشاء الكوبون بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function updateCoupon(id: number, data: Partial<TCouponPayload>) {
  try {
    const nextServerAPI = await getNextServerAPI();
    await nextServerAPI.patch<IOfferCoupon>(`/admin/coupons/${id}`, data);
    revalidatePath("/dashboard/coupons");
    return APIResponse.success<void>(undefined, "تم تحديث الكوبون بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function deleteCoupon(id: number) {
  try {
    const nextServerAPI = await getNextServerAPI();
    await nextServerAPI.delete(`/admin/coupons/${id}`);
    revalidatePath("/dashboard/coupons");
    return APIResponse.success<void>(undefined, "تم حذف الكوبون بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function toggleCouponStatus(id: number, isActive: boolean) {
  try {
    const nextServerAPI = await getNextServerAPI();
    await nextServerAPI.patch(`/admin/coupons/${id}`, { isActive });
    revalidatePath("/dashboard/coupons");
    return APIResponse.success<void>(
      undefined,
      isActive ? "تم تفعيل الكوبون بنجاح" : "تم إلغاء تفعيل الكوبون بنجاح",
    );
  } catch (error) {
    return APIResponse.error(error);
  }
}
