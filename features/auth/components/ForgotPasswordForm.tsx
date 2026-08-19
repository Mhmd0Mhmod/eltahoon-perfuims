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
function ForgotPasswordForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const handleSubmit = useCallback(
    async (data: ForgotPasswordSchema) => {
      const id = toast.loading("جاري إرسال رابط إعادة تعيين كلمة المرور...");
      const respone = {
        success: true,
        message: "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني",
      };
      if (!respone?.success) {
        form.setError("root", { type: "server", message: respone?.message });
        toast.error(respone?.message, { id });
        return;
      }

      toast.success(respone?.message, { id });
      const token = encodeURI(data.email);
      router.replace(`/reset-password?t=${token}`);
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
