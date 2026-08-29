import { DiscountType } from "@/features/offers/types";
import z from "zod";

export const couponSchema = z.object({
  code: z.string().min(2, "الكود يجب أن يكون حرفين على الأقل"),
  discountType: z.enum(DiscountType, { message: "نوع الخصم مطلوب" }),
  discountValue: z
    .number({ message: "قيمة الخصم مطلوبة" })
    .min(0, "قيمة الخصم يجب أن تكون أكبر من أو تساوي 0"),
  minimumOrderAmount: z
    .number({ message: "الحد الأدنى للطلب مطلوب" })
    .min(0, "الحد الأدنى يجب أن يكون أكبر من أو يساوي 0"),
  maxUsages: z
    .number({ message: "حد الاستخدام مطلوب" })
    .min(0, "حد الاستخدام يجب أن يكون أكبر من أو يساوي 0"),
  expiresAt: z.date({ message: "تاريخ الانتهاء مطلوب" }),
  isActive: z.boolean(),
});

export type CouponFormValues = z.infer<typeof couponSchema>;
