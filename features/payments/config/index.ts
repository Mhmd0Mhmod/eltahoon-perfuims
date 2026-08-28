import { Banknote, CheckCircle2, CreditCard } from "lucide-react";

export const PAYMENT_METHOD_CONFIG = {
  VISA: {
    label: "بطاقة ائتمان",
    variant: "default" as const,
    icon: CreditCard,
    description: "الدفع باستخدام بطاقة الائتمان الخاصة بك",
  },
  PAYPAL: {
    label: "باي بال",
    variant: "secondary" as const,
    icon: CheckCircle2,
    description: "الدفع باستخدام حساب باي بال الخاص بك",
  },
  CASH_ON_DELIVERY: {
    label: " نقدًا عند الاستلام",
    variant: "secondary" as const,
    icon: Banknote,
    description: "الدفع عند الاستلام",
  },
} as const;
export const PAYMENT_METHODS = Object.keys(PAYMENT_METHOD_CONFIG) as Array<
  keyof typeof PAYMENT_METHOD_CONFIG
>;
