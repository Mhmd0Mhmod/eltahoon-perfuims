"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { resetPasswordSchema, ResetPasswordSchema } from "../schema";
import { toast } from "@/components/ui/toast";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
function ResetPasswordForm({ email }: { email: string }) {
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email,
      otp: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const onSubmit = async (data: ResetPasswordSchema) => {
    console.log(data);

    const id = toast.add({
      title: "جاري إعادة تعيين كلمة المرور",
      description: "يرجى الانتظار...",
      type: "loading",
    });
    // const respone = await resetPassword({
    //   ...data,
    //   email: email,
    // });
    const response = {
      success: true,
      message: "تم إعادة تعيين كلمة المرور بنجاح",
    };
    if (response?.success) {
      toast.add({
        title: "تم إعادة تعيين كلمة المرور بنجاح",
        description: response?.message,
        type: "success",
        id,
      });
      form.reset();
    } else {
      toast.add({
        title: "حدث خطأ",
        description: response?.message,
        type: "error",
        id,
      });
    }
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="email"
        control={form.control}
        disabled={true}
        render={({ field, fieldState }) => (
          <Field className="space-y-2">
            <FieldLabel>البريد الإلكتروني</FieldLabel>
            <FieldContent>
              <Input
                placeholder="أدخل بريدك الإلكتروني"
                className="disabled:cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-400"
                {...field}
              />
            </FieldContent>
            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />
      <Controller
        name="otp"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="space-y-2">
            <FieldLabel>رمز التحقق</FieldLabel>
            <FieldContent className="m-auto max-w-fit" dir="ltr">
              <InputOTP maxLength={6} defaultValue={"123456"}>
                <InputOTPGroup className="m-auto" {...field}>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </FieldContent>
            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />
      <Controller
        name="newPassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="space-y-2">
            <FieldLabel>كلمة المرور الجديدة</FieldLabel>
            <FieldContent>
              <PasswordInput
                placeholder="أدخل كلمة المرور الجديدة"
                {...field}
              />
            </FieldContent>
            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />
      <Controller
        name="confirmNewPassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="space-y-2">
            <FieldLabel>تأكيد كلمة المرور</FieldLabel>
            <FieldContent>
              <PasswordInput
                placeholder="أعد إدخال كلمة المرور الجديدة"
                {...field}
              />
            </FieldContent>
            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />
      <Button type="submit" className="w-full">
        إعادة تعيين كلمة المرور
      </Button>
    </form>
  );
}
export default ResetPasswordForm;
