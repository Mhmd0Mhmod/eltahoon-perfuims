import { Roles } from "@/enums/roles";
import { IOrder } from "@/features/orders/types";
import { IPayment } from "@/features/payments/types";

interface ICustomer {
  id: number;
  fullName: string;
  username: string;
  email: string;
  address: string;
  phoneNumber: string;
  role: (typeof Roles)[keyof typeof Roles];
  createdAt: string;
  updatedAt: string;
  orders: IOrder[];
  deleted: false;
  payments: IPayment[];
}
export type { ICustomer };
