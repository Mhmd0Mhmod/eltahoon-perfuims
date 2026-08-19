import z from "zod";

export const profileSchema = z.object({
  fullName: z
    .string({ message: "الاسم الكامل مطلوب" })
    .min(3, { message: "الاسم الكامل يجب أن يكون 3 أحرف على الأقل" }),
  email: z
    .string({ message: "البريد الإلكتروني مطلوب" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "البريد الإلكتروني غير صالح",
    }),
  phoneNumber: z
    .string({ message: "رقم الهاتف مطلوب" })
    .regex(/^\d{1,14}$/, { message: "رقم الهاتف غير صالح" })
    .min(10, { message: "رقم الهاتف يجب أن يكون 10 أرقام على الأقل" }),
  address: z.string().optional(),
});
export type ProfileSchema = z.infer<typeof profileSchema>;
