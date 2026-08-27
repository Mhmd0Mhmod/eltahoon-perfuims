import { MarketKey } from "@/config/markets";
import { TPaginationParams } from "@/types/pagination";

interface IOrder {
  orderId: string;
  orderNumber: string;
  totalAmount: number;
  status: OrderStatus;
  countryCode: MarketKey;
  shippingAddress: null;
  phoneNumber: null;
  user: {
    userId: number;
    name: string;
    email: string;
    phoneNumber: string;
    shippingAddress: string;
  };
  payment: {
    paymentMethodId: number;
    paymentMethodName: string;
    paymentStatus: PaymentStatus;
    transactionId: string;
  };
  items: IOrderItem[];
  createdAt: string;
  paymentUrl?: string | null;
}
interface IOrderItem {
  productVariantId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export const ORDER_STATUS_CONFIG: Record<
  OrderStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  PENDING: {
    label: "قيد الانتظار",
    variant: "secondary",
  },
  CONFIRMED: {
    label: "مؤكد",
    variant: "default",
  },
  SHIPPED: {
    label: "تم الشحن",
    variant: "outline",
  },
  DELIVERED: {
    label: "تم التسليم",
    variant: "default",
  },
  CANCELLED: {
    label: "ملغي",
    variant: "destructive",
  },
} as const;
const ORDER_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
} as const;
type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
export const PAYMENT_STATUS_CONFIG = {
  PENDING: {
    label: "قيد الانتظار",
    variant: "secondary",
  },
  COMPLETED: {
    label: "مكتمل",
    variant: "default",
  },
  FAILED: {
    label: "فشل",
    variant: "destructive",
  },
  REFUNDED: {
    label: "مسترجع",
    variant: "outline",
  },
} as const;

const PAYMENT_STATUS = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
} as const;
type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export const PERIOD_OPTIONS_CONFIG = {
  DAILY: {
    label: "يومي",
  },
  WEEKLY: {
    label: "أسبوعي",
  },
  MONTHLY: {
    label: "شهري",
  },
  YEARLY: {
    label: "سنوي",
  },
  ALL_TIME: {
    label: "كل الوقت",
  },
} as const;
const PERIOD_OPTIONS = {
  DAILY: "DAILY",
  WEEKLY: "WEEKLY",
  MONTHLY: "MONTHLY",
  YEARLY: "YEARLY",
  ALL_TIME: "ALL_TIME",
} as const;
type PeriodOptions = (typeof PERIOD_OPTIONS)[keyof typeof PERIOD_OPTIONS];

export type IOrderSearchParams = TPaginationParams & {
  status?: OrderStatus;
  period?: PeriodOptions;
};

export { ORDER_STATUS, PAYMENT_STATUS, PERIOD_OPTIONS };
export type { IOrder, IOrderItem, OrderStatus, PaymentStatus, PeriodOptions };
