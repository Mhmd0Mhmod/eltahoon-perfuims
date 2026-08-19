export interface IOffer {
  id: number;
  title: string;
  description: string;
  discountType: (typeof DiscountType)[keyof typeof DiscountType];
  discountValue: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  countryCode: string;
  productVariantIds: number[];
}

export const DiscountType = {
  PERCENTAGE: "PERCENTAGE",
  FIXED_AMOUNT: "FIXED_AMOUNT",
} as const;

export interface IOfferCoupon {
  id: number;
  code: string;
  discountType: (typeof DiscountType)[keyof typeof DiscountType];
  discountValue: number;
  minimumOrderAmount: number;
  maxUsages: number;
  currentUsages: number;
  expiresAt: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface IAppliedCouponResponse {
  cartTotal: number;
  couponCode: string;
  discountAmount: number;
  discountType: (typeof DiscountType)[keyof typeof DiscountType];
  discountValue: number;
  minimumOrderAmount: number;
  totalAfterDiscount: number;
}
