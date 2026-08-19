export const PAYMENT_METHOD_CONFIG = {
  VISA: {
    label: "بطاقة ائتمان",
    variant: "default" as const,
  },
  PAYPAL: {
    label: "باي بال",
    variant: "secondary" as const,
  },
  CASH_ON_DELIVERY: {
    label: "نقدا",
    variant: "secondary" as const,
  },
} as const;
