"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, Form, useForm } from "react-hook-form";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { ForgotPasswordSchema, forgotPasswordSchema } from "../schema";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword as forgotPasswordAction } from "@/app/(auth)/actions";
function ForgotPasswordForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const { mutate: forgotPassword, isPending: isSubmitting } = useMutation({
    mutationFn: forgotPasswordAction,
    onSuccess: () => {
      toast.success(
        "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني",
      );
      form.reset();
    },
    onError: (error: any) => {
      toast.error(
        error?.message || "حدث خطأ أثناء إرسال رابط إعادة تعيين كلمة المرور.",
      );
    },
  });
  const handleSubmit = useCallback(
    async (data: ForgotPasswordSchema) => {
      forgotPassword(data, {
        onSuccess: () => {
          const token = encodeURI(data.email);
          router.replace(`/reset-password?t=${token}`);
        },
      });
    },
    [router, form],
  );
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="space-y-2">
            <FieldLabel>البريد الإلكتروني أو اسم المستخدم</FieldLabel>
            <FieldContent>
              <Input
                placeholder="أدخل بريدك الإلكتروني أو اسم المستخدم"
                {...field}
              />
            </FieldContent>
            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />
      {form.formState.errors.root?.message && (
        <p className="text-sm text-red-600">
          {form.formState.errors.root.message}
        </p>
      )}
      <Button type="submit" className="w-full">
        إرسال رابط إعادة تعيين كلمة المرور
      </Button>
    </form>
  );
}
export default ForgotPasswordForm;
