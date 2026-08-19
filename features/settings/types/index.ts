import { IPaymentMethod } from "@/features/payments/types";

export interface ICountry {
  id: number;
  name: string;
  currency: string;
  code: string;
  contactNumber: string;
  email: string;
  address: string;
  flag: string;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  paymentMethods: IPaymentMethod[];
}
export interface IPublicCountry {
  name: {
    common: string;
    official: string;
    nativeName: { [key: string]: { official: string; common: string } };
  };
  cca2: string;
  currencies: { [key: string]: { name: string; symbol: string } };
  flag: string;
}
