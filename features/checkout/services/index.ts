import { nextAPI } from "@/lib/nextAPI";
import { IOrder } from "@/features/orders/types";

export interface ICreateOrderPayload {
  shippingAddress: string;
  phoneNumber: string;
  paymentMethodId: number;
  paymentToken?: string;
  couponCode?: string;
}

export interface IApplyCouponResponse {
  couponCode: string;
  discountType: "PERCENTAGE" | "FIXED_AMOUNT";
  discountValue: number;
  minimumOrderAmount: number;
  cartTotal: number;
  discountAmount: number;
  totalAfterDiscount: number;
}

export function applyCoupon(code: string) {
  return nextAPI.post<IApplyCouponResponse>("/coupons/apply", { code });
}

export function createOrder(payload: ICreateOrderPayload) {
  return nextAPI.post<IOrder>("/orders", payload);
}
