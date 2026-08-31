"use server";

import { CheckoutFormValues } from "@/features/checkout/types";
import { getNextServerAPI } from "@/lib/nextServerAPI";

export async function createOrderAction(
  data: Partial<CheckoutFormValues> & {
    shippingAddress: string;
    couponCode: string | null;
  },
) {
  try {
    const api = await getNextServerAPI();
    const response = await api.post("/orders", data);
    return {
      success: true,
      data: response.data,
      message: "تم إنشاء الطلب بنجاح",
    };
  } catch (error: unknown) {
    console.error("Error creating order:", error);
    const message = (error as { response?: { data?: { message?: string } } })
      ?.response?.data?.message;
    return {
      success: false,
      data: null,
      message: message || "حدث خطأ أثناء إتمام الطلب، يرجى المحاولة مرة أخرى",
    };
  }
}
