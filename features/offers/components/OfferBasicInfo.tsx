"use client";

import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useFormContext } from "react-hook-form";
import { OfferFormValues } from "../schema";

export default function OfferBasicInfo() {
  const { control } = useFormContext<OfferFormValues>();

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">معلومات العرض</h2>

        <p className="text-sm text-muted-foreground">
          أدخل المعلومات الأساسية الخاصة بالعرض.
        </p>
      </div>

      <Controller
        name="title"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="space-y-2">
            <FieldLabel>عنوان العرض</FieldLabel>

            <FieldContent>
              <Input placeholder="مثال: تخفيضات نهاية الموسم" {...field} />
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
            <FieldLabel>وصف العرض</FieldLabel>

            <FieldContent>
              <Textarea
                placeholder="اكتب وصفاً تفصيلياً للعرض..."
                className="min-h-20"
                {...field}
              />
            </FieldContent>

            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />
    </section>
  );
}
