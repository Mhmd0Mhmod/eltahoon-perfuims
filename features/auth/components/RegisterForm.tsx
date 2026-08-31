"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { RegisterSchema, registerSchema } from "../schema";
import PasswordInput from "@/components/PasswordInput";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { registerAction } from "@/app/(auth)/actions";

function RegisterForm() {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      fullName: "",
      phoneNumber: "",
      address: "",
      role: "customer",
    },
  });
  const { mutate: register, isPending: isRegistering } = useMutation({
    mutationFn: registerAction,
    onSuccess: () => {
      toast.success("تم التسجيل بنجاح!");
      form.reset();
    },
    onError: (error: any) => {
      toast.error(error?.message || "حدث خطأ أثناء التسجيل.");
    },
  });

  const onSubmit = useCallback(
    async function (data: RegisterSchema) {
      register(data);
    },
    [form],
  );

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="fullName"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>الاسم الكامل</FieldLabel>
            <FieldContent>
              <Input placeholder="أدخل اسمك الكامل" {...field} />
            </FieldContent>
            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />

      <Controller
        name="username"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>اسم المستخدم</FieldLabel>
            <FieldContent>
              <Input placeholder="أدخل اسم المستخدم" {...field} />
            </FieldContent>
            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />

      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>البريد الإلكتروني</FieldLabel>
            <FieldContent>
              <Input {...field} type="email" placeholder="example@domain.com" />
            </FieldContent>
            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />
      <Controller
        name="phoneNumber"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>رقم الهاتف</FieldLabel>
            <FieldContent>
              <Input {...field} type="tel" placeholder="+1234567890" />
            </FieldContent>
            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />

      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>كلمة المرور</FieldLabel>
            <FieldContent>
              <PasswordInput placeholder="أدخل كلمة المرور" {...field} />
            </FieldContent>
            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />

      <Controller
        name="address"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>العنوان</FieldLabel>
            <FieldContent>
              <Input {...field} placeholder="أدخل عنوانك" />
            </FieldContent>
            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />

      <Button type="submit" className="w-full" disabled={isRegistering}>
        تسجيل
      </Button>
    </form>
  );
}
export default RegisterForm;
