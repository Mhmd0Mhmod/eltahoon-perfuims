"use client";
import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { SignInSchema, signInSchema } from "../schema";
import { useAuth } from "../hooks/useAuth";

function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
  const handleSubmit = useCallback(
    async (credentials: SignInSchema) => {
      const response = await login(credentials);
      if (!response.success) {
        form.setError("root", {
          type: "manual",
          message: response.message || "حدث خطأ غير معروف",
        });
        toast.error(response.message || "حدث خطأ غير معروف");
        return;
      }
      toast.success("تم تسجيل الدخول بنجاح");
      router.push("/");
    },
    [router, form],
  );
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <Controller
        name="identifier"
        control={form.control}
        render={({ field }) => (
          <Field className="space-y-2">
            <FieldLabel>اسم المستخدم أو البريد الإلكتروني</FieldLabel>
            <FieldContent>
              <Input
                placeholder="أدخل اسم المستخدم أو البريد الإلكتروني"
                {...field}
              />
            </FieldContent>
            <FieldError>{form.formState.errors.identifier?.message}</FieldError>
          </Field>
        )}
      />
      <Controller
        name="password"
        control={form.control}
        render={({ field }) => (
          <Field className="space-y-2">
            <FieldLabel>كلمة المرور</FieldLabel>
            <FieldContent>
              <PasswordInput field={field} />
            </FieldContent>

            <FieldError>{form.formState.errors.password?.message}</FieldError>
          </Field>
        )}
      />
      <Button
        variant="link"
        className="text-xs text-primary my-0 mr-auto -mt-4 block"
      >
        <Link href="/forgot-password">نسيت كلمة المرور؟</Link>
      </Button>

      {form.formState.errors.root?.message && (
        <p className="text-sm text-red-600">
          {form.formState.errors.root.message}
        </p>
      )}
      <Button
        type="submit"
        className="w-full rounded-none border border-primary/40 bg-primary/10 px-8 text-sm tracking-[0.16em] text-primary uppercase hover:bg-primary/20"
      >
        تسجيل الدخول
      </Button>
    </form>
  );
}
export default LoginForm;
