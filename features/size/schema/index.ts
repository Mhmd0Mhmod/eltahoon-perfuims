import { SIZES_UNITS } from "@/enums/sizes";
import z from "zod";

export const sizeSchema = z.object({
  size: z.number({ message: "حجم الزجاجة مطلوب" }).min(1, {
    message: "حجم الزجاجة يجب أن يكون أكبر من صفر",
  }),
  unit: z.enum(SIZES_UNITS, { message: "وحدة الحجم مطلوبة" }),
});
export type SizeSchema = z.infer<typeof sizeSchema>;
