import { DiscountType } from "@/features/offers/types";
import z from "zod";

export const offerSchema = z.object({
  title: z.string().min(2, "العنوان يجب أن يكون حرفين على الأقل"),
  description: z.string().min(10, "الوصف يجب أن يكون 10 أحرف على الأقل"),
  discountType: z.enum(DiscountType),
  discountValue: z.number().min(0, "قيمة الخصم يجب أن تكون أكبر من 0"),
  startDate: z.date(),
  endDate: z.date(),
  isActive: z.boolean(),
  productVariantIds: z.array(z.number()),
});

export type OfferFormValues = z.infer<typeof offerSchema>;
