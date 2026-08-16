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
import { toast } from "@/components/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { SignInSchema, signInSchema } from "../schema";
import Link from "next/link";
function LoginForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
  const handleSubmit = useCallback(
    async (data: SignInSchema) => {
      const id = toast.add({
        title: "جاري تسجيل الدخول",
        description: "يرجى الانتظار...",
        type: "loading",
      });
      const respone = {
        success: true,
        message: "تم تسجيل الدخول بنجاح",
      };
      if (!respone?.success) {
        form.setError("root", { type: "server", message: respone?.message });
        toast.add({
          title: "فشل تسجيل الدخول",
          description: respone?.message,
          type: "error",
          id,
        });
        return;
      }
      toast.add({
        title: "تم تسجيل الدخول بنجاح!",
        description: "أهلاً بك!",
        type: "success",
        id,
      });
      router.replace("/");
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
