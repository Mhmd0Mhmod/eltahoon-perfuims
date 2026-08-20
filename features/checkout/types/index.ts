import { PAYMENT_METHODS } from "@/features/payments/config";
import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "الاسم الكامل مطلوب"),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  phoneNumber: z.string().min(6, "رقم الهاتف مطلوب"),
  city: z.string().min(2, "المدينة مطلوبة"),
  address: z.string().min(5, "العنوان التفصيلي مطلوب"),
  postalCode: z.string().optional(),
  notes: z.string().optional(),
  paymentMethod: z.enum(PAYMENT_METHODS ),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
