import { PaymentStatus } from "@/features/orders/types";

export interface IPayment {
  paymentId: number;
  orderId: number;
  userId: number;
  username: string;
  paymentMethodType: string;
  paymentStatus: PaymentStatus;
  countryCode: string;
  amount: number;
  transactionId: string;
  createdAt: string;
  paymentDate: string;
}
export interface IPaymentMethod {
  id: number;
  name: string;
}
