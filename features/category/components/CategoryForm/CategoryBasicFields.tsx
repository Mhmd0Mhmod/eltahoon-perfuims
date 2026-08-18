"use client";

import { Controller, useFormContext } from "react-hook-form";

import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { AddCategorySchema } from "../../schema";

export default function CategoryBasicFields() {
  const form = useFormContext<AddCategorySchema>();
  const { control } = form;
  return (
    <div className="space-y-4">
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="space-y-2">
            <FieldLabel>اسم التصنيف</FieldLabel>

            <FieldContent>
              <Input placeholder="أدخل اسم التصنيف..." {...field} />
            </FieldContent>

            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="space-y-2">
            <FieldLabel>الوصف</FieldLabel>

            <FieldContent>
              <Textarea
                placeholder="أدخل وصف التصنيف..."
                {...field}
                value={field.value ?? ""}
              />
            </FieldContent>

            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />

      <Controller
        name="isActive"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="flex flex-row items-center justify-between rounded-md border p-4">
            <div className="space-y-0.5 text-right ">
              <FieldLabel>نشط</FieldLabel>

              <p className="text-sm text-muted-foreground">
                هل تريد تفعيل هذا التصنيف؟
              </p>
            </div>

            <FieldContent>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FieldContent>

            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />

      <Controller
        name="isAtHomePage"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="flex flex-row items-center justify-between rounded-md border p-4">
            <div className="space-y-0.5 text-right">
              <FieldLabel>عرض في الصفحة الرئيسية</FieldLabel>

              <p className="text-sm text-muted-foreground">
                هل تريد عرض هذا التصنيف في الصفحة الرئيسية؟
              </p>
            </div>

            <FieldContent>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FieldContent>

            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />
    </div>
  );
}
