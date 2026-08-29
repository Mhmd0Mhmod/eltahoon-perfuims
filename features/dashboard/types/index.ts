import { MarketKey } from "@/config/markets";
import { OrderStatus, PaymentStatus } from "@/features/orders/types";

export interface IDashboardStats {
  year: number;
  totalUsers: number;
  totalOrders: number;
  totalPayments: number;
  totalRevenue: number;
  monthlyStats: IMonthlyStat[];
  recentOrders: IDashboardOrder[];
  recentPayments: IDashboardPayment[];
}

export interface IMonthlyStat {
  month: string;
  monthNumber: number;
  totalOrders: number;
  totalPayments: number;
  totalRevenue: number;
}

export interface IDashboardOrder {
  orderId: number;
  orderNumber: string;
  totalAmount: number;
  status: OrderStatus;
  countryCode: MarketKey;
  shippingAddress: string;
  phoneNumber: string;
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
  items: {
    productVariantId: number;
    productName: string;
    imageUrl: string;
    size: number;
    unit: string;
    unitPrice: number;
    quantity: number;
    subtotal: number;
  }[];
  paymentUrl: string;
  couponCode: string;
  discountAmount: number;
  createdAt: string;
}

export interface IDashboardPayment {
  paymentId: number;
  orderId: number;
  userId: number;
  username: string;
  countryCode: MarketKey;
  paymentMethodType: string;
  paymentStatus: PaymentStatus;
  amount: number;
  transactionId: string;
  createdAt: string;
  paymentDate: string;
}
