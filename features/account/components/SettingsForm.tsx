"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { profileSchema, ProfileSchema } from "../schema";
import { updateProfileAction } from "@/app/(shop)/account/actions";

interface SettingsFormProps {
  user: User;
}

export function SettingsForm({ user }: SettingsFormProps) {
  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user.fullName ?? "",
      email: user.email ?? "",
      phoneNumber: user.phoneNumber ?? "",
      address: user.address ?? "",
    },
  });

  const onSubmit = useCallback(async (data: ProfileSchema) => {
    const toastId = toast.loading("جارٍ تحديث بياناتك...");

    try {
      const result = await updateProfileAction(data);

      if (result.success) {
        toast.success(result.message || "تم تحديث البيانات بنجاح", {
          id: toastId,
        });
      } else {
        toast.error(result.message || "حدث خطأ أثناء تحديث البيانات", {
          id: toastId,
        });
      }
    } catch {
      toast.error("حدث خطأ غير متوقع", {
        id: toastId,
      });
    }
  }, []);

  const isSubmitting = form.formState.isSubmitting;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
      dir="rtl"
    >
      <FieldGroup>
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Username */}
          <Field>
            <FieldLabel htmlFor="username">اسم المستخدم</FieldLabel>

            <Input
              id="username"
              value={user.username ?? ""}
              disabled
              className="bg-muted"
            />

            <FieldDescription>لا يمكن تغيير اسم المستخدم.</FieldDescription>
          </Field>

          {/* Full Name */}
          <Controller
            control={form.control}
            name="fullName"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="fullName">الاسم الكامل</FieldLabel>

                <Input
                  {...field}
                  id="fullName"
                  placeholder="أدخل اسمك الكامل"
                  autoComplete="name"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Email */}
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">البريد الإلكتروني</FieldLabel>

                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="example@domain.com"
                  autoComplete="email"
                  dir="ltr"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Phone */}
          <Controller
            control={form.control}
            name="phoneNumber"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="phoneNumber">رقم الهاتف</FieldLabel>

                <Input
                  {...field}
                  id="phoneNumber"
                  type="tel"
                  placeholder="0123456789"
                  autoComplete="tel"
                  dir="ltr"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Address */}
          <Controller
            control={form.control}
            name="address"
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="sm:col-span-2"
              >
                <FieldLabel htmlFor="address">العنوان</FieldLabel>

                <Input
                  {...field}
                  id="address"
                  placeholder="أدخل عنوانك"
                  autoComplete="street-address"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </FieldGroup>

      <div className="flex justify-end border-t pt-5">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "جاري الحفظ..." : "حفظ التغييرات"}
        </Button>
      </div>
    </form>
  );
}
