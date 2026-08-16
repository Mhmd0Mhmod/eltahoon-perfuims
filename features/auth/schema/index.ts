import z from "zod";

export const signInSchema = z.object({
  identifier: z
    .string({ message: "اسم المستخدم أو البريد الإلكتروني مطلوب" })
    .min(3, { message: "يجب أن يكون 3 أحرف على الأقل" }),
  password: z
    .string()
    .min(4, { message: "كلمة المرور يجب أن تكون 4 أحرف على الأقل" }),
});
export type SignInSchema = z.infer<typeof signInSchema>;
export const registerSchema = z.object({
  username: z
    .string({ message: "اسم المستخدم مطلوب" })
    .min(3, { message: "اسم المستخدم يجب أن يكون 3 أحرف على الأقل" }),
  password: z
    .string({ message: "كلمة المرور مطلوبة" })
    .min(4, { message: "كلمة المرور يجب أن تكون 4 أحرف على الأقل" }),
  email: z
    .string({ message: "البريد الإلكتروني مطلوب" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "البريد الإلكتروني غير صالح",
    }),
  fullName: z
    .string({ message: "الاسم الكامل مطلوب" })
    .min(3, { message: "الاسم الكامل يجب أن يكون 3 أحرف على الأقل" }),
  address: z.string().optional(),
  phoneNumber: z
    .string({ message: "رقم الهاتف مطلوب" })
    .regex(/^\d{1,14}$/, { message: "رقم الهاتف غير صالح" })
    .min(10, { message: "رقم الهاتف يجب أن يكون 10 أرقام على الأقل" }),
  role: z.literal("customer"),
});
export type RegisterSchema = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z.email({ message: "البريد الإلكتروني غير صالح" }),
});
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  email: z.string(),
  otp: z.string().min(6, { message: "الرمز يجب أن يكون 6 أرقام" }),
  newPassword: z
    .string()
    .min(4, { message: "كلمة المرور يجب أن تكون 4 أحرف على الأقل" }),
  confirmNewPassword: z
    .string()
    .min(4, { message: "كلمة المرور يجب أن تكون 4 أحرف على الأقل" }),
});
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
