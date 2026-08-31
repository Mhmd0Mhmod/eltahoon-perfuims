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
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }
}
