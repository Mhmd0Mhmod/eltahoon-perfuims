"use server";

import { ProductAPI } from "@/lib/api/product";
import { authFetcher } from "@/lib/authFetcher";
import {
  AddCategorySchema,
  AddCountrySchema,
  AddProductSchema,
  AddSizeSchema,
  CouponFormValues,
  StoreSettingsSchema,
} from "@/lib/zod";
import { APIResponse, IAPIResponse } from "@/types/api";
import { Category } from "@/types/category";
import { Country } from "@/types/country";
import { DiscountType } from "@/types/offer";
import { OrderStatus, PaymentStatus } from "@/types/order";
import { Product } from "@/types/product";
import { Size } from "@/types/size";
import { revalidatePath } from "next/cache";

export async function addCategory(data: AddCategorySchema): Promise<IAPIResponse<Category>> {
  try {
    const response = await authFetcher.post<Category>("admin/categories", data);
    revalidatePath("/admin/categories");
    return APIResponse.success<Category>(response.data, "تمت إضافة التصنيف بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function updateCategory(
  categoryId: number,
  data: Partial<AddCategorySchema>,
): Promise<IAPIResponse<Category>> {
  try {
    const response = await authFetcher.patch<Category>(`admin/categories/${categoryId}`, data);
    revalidatePath(`/admin/categories/${categoryId}`);
    revalidatePath("/admin/categories");
    return APIResponse.success<Category>(response.data, "تم تحديث بيانات التصنيف بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function deleteCategory(categoryId: number): Promise<IAPIResponse> {
  try {
    await authFetcher.delete(`admin/categories/${categoryId}`);
    revalidatePath("/admin/categories");
    return APIResponse.success<void>(undefined, "تم حذف التصنيف بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function addCountry(data: AddCountrySchema): Promise<IAPIResponse<Country>> {
  try {
    const response = await authFetcher.post<Country>("admin/countries", data);
    revalidatePath("/admin/countries");
    return APIResponse.success<Country>(response.data, "تمت إضافة الدولة بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function updateCountry(
  countryId: number,
  data: Partial<AddCountrySchema>,
): Promise<IAPIResponse<Country>> {
  try {
    const response = await authFetcher.patch<Country>(`admin/countries/${countryId}`, data);
    revalidatePath(`/admin/countries/${countryId}`);
    revalidatePath("/admin/countries");
    return APIResponse.success<Country>(response.data, "تم تحديث بيانات الدولة بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function deleteCountry(countryId: number): Promise<IAPIResponse> {
  try {
    await authFetcher.delete(`admin/countries/${countryId}`);
    revalidatePath("/admin/countries");
    return APIResponse.success<void>(undefined, "تم حذف الدولة بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function deleteCustomerAction(customerId: number | string) {
  try {
    await authFetcher.delete(`admin/users/${customerId}`);
    revalidatePath("/admin/customers");
    return APIResponse.success<void>(undefined, "تم حذف العميل بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

interface OfferFormData {
  title: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export async function createOffer(data: OfferFormData): Promise<IAPIResponse> {
  try {
    await authFetcher.post("admin/offers", data);
    revalidatePath("/admin/offers");

    return APIResponse.success<void>(undefined, "تم إنشاء العرض بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function updateOffer(id: number, data: OfferFormData): Promise<IAPIResponse> {
  try {
    await authFetcher.patch(`admin/offers/${id}`, data);
    revalidatePath(`/admin/offers/${id}`);
    return APIResponse.success<void>(undefined, "تم تحديث العرض بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function deleteOffer(id: number): Promise<IAPIResponse> {
  try {
    await authFetcher.delete(`admin/offers/${id}`);
    revalidatePath("/admin/offers");
    return APIResponse.success<void>(undefined, "تم حذف العرض بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function toggleOfferStatus(id: number, isActive: boolean): Promise<IAPIResponse> {
  try {
    await authFetcher.patch(`admin/offers/${id}/status`, { isActive });
    revalidatePath("/admin/offers");
    return APIResponse.success<void>(
      undefined,
      isActive ? "تم تفعيل العرض بنجاح" : "تم إلغاء تفعيل العرض بنجاح",
    );
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
): Promise<IAPIResponse> {
  try {
    await authFetcher.patch(
      `/admin/orders/${orderId}/status`,
      {},
      {
        params: {
          status,
        },
      },
    );
    revalidatePath("/admin/orders");
    return APIResponse.success<void>(undefined, "تم تحديث حالة الطلب بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function cancelOrder(orderId: string): Promise<IAPIResponse> {
  try {
    await authFetcher.patch(`/admin/orders/${orderId}/status`, { status: "CANCELLED" });
    revalidatePath("/admin/orders");
    return APIResponse.success<void>(undefined, "تم إلغاء الطلب بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function changePaymentStatus(
  paymentId: number,
  status: PaymentStatus,
): Promise<IAPIResponse> {
  try {
    const { data } = await authFetcher.patch(
      `/admin/payments/${paymentId}/status`,
      {},
      {
        params: {
          status,
        },
      },
    );
    revalidatePath("/admin/payments");
    return APIResponse.success<void>(undefined, data.message || "تم تحديث حالة الدفع بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function addProduct(data: AddProductSchema): Promise<IAPIResponse<Product>> {
  try {
    const response = await authFetcher.post<Product>(
      "admin/products",
      ProductAPI.getProductFormData(data),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    revalidatePath("/admin/products");
    return APIResponse.success<Product>(response.data, "تمت إضافة المنتج بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function updateProduct(
  productId: number,
  data: AddProductSchema,
): Promise<IAPIResponse<Product>> {
  try {
    const response = await authFetcher.patch<Product>(
      `admin/products/${productId}`,
      ProductAPI.getProductFormData(data),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    revalidatePath("/admin/products");
    return APIResponse.success<Product>(response.data, "تم تحديث بيانات المنتج بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function deleteProduct(productId: number): Promise<IAPIResponse> {
  try {
    await authFetcher.delete(`admin/products/${productId}`);
    revalidatePath("/admin/products");
    return APIResponse.success<void>(undefined, "تم حذف المنتج بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function updateStoreSettingsAction(
  formData: StoreSettingsSchema,
): Promise<IAPIResponse> {
  try {
    await authFetcher.put("admin/settings", formData);
    revalidatePath("/admin/settings");
    return APIResponse.success<void>(undefined, "تم تحديث إعدادات المتجر بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function addSize(data: AddSizeSchema): Promise<IAPIResponse<Size>> {
  try {
    const response = await authFetcher.post<Size>("admin/sizes", data);
    revalidatePath("/admin/sizes");
    return APIResponse.success<Size>(response.data, "تمت إضافة الحجم بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function updateSize(
  sizeId: string,
  data: Partial<AddSizeSchema>,
): Promise<IAPIResponse<Size>> {
  try {
    const response = await authFetcher.patch<Size>(`admin/sizes/${sizeId}`, data);
    revalidatePath("/admin/sizes");
    return APIResponse.success<Size>(response.data, "تم تحديث بيانات الحجم بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function deleteSize(sizeId: string): Promise<IAPIResponse> {
  try {
    await authFetcher.delete(`admin/sizes/${sizeId}`);
    revalidatePath("/admin/sizes");
    return APIResponse.success<void>(undefined, "تم حذف الحجم بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function createCoupon(data: CouponFormValues): Promise<IAPIResponse> {
  try {
    await authFetcher.post("admin/coupons", data);
    revalidatePath("/admin/coupons");

    return APIResponse.success<void>(undefined, "تم إنشاء الكوبون بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function updateCoupon(id: number, data: CouponFormValues): Promise<IAPIResponse> {
  try {
    await authFetcher.put(`admin/coupons/${id}`, data);
    revalidatePath(`/admin/coupons/${id}`);
    revalidatePath("/admin/coupons");
    return APIResponse.success<void>(undefined, "تم تحديث الكوبون بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function deleteCoupon(id: number): Promise<IAPIResponse> {
  try {
    await authFetcher.delete(`admin/coupons/${id}`);
    revalidatePath("/admin/coupons");
    return APIResponse.success<void>(undefined, "تم حذف الكوبون بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function toggleCouponStatus(id: number, isActive: boolean): Promise<IAPIResponse> {
  try {
    await authFetcher.patch(`admin/coupons/${id}`, { isActive });
    revalidatePath("/admin/coupons");
    return APIResponse.success<void>(
      undefined,
      isActive ? "تم تفعيل الكوبون بنجاح" : "تم إلغاء تفعيل الكوبون بنجاح",
    );
  } catch (error) {
    return APIResponse.error(error);
  }
}
