import { Banknote, CheckCircle2, CreditCard } from "lucide-react";

export const PAYMENT_METHOD_CONFIG = {
  VISA: {
    label: "بطاقة ائتمان",
    variant: "default" as const,
    icon: CreditCard,
    description: "الدفع باستخدام بطاقة الائتمان الخاصة بك",
    key: "VISA",
    id: 1,
  },
  CASH_ON_DELIVERY: {
    label: " نقدًا عند الاستلام",
    variant: "secondary" as const,
    icon: Banknote,
    description: "الدفع عند الاستلام",
    key: "CASH_ON_DELIVERY",
    id: 2,
  },
} as const;
export const PAYMENT_METHODS = Object.keys(PAYMENT_METHOD_CONFIG) as Array<
  keyof typeof PAYMENT_METHOD_CONFIG
>;
