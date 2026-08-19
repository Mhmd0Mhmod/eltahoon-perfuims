"use client";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { Controller, useFormContext } from "react-hook-form";
import { OfferFormValues } from "../schema";

export default function OfferStatus() {
  const { control } = useFormContext<OfferFormValues>();

  return (
    <Controller
      name="isActive"
      control={control}
      render={({ field, fieldState }) => (
        <Field className="flex flex-row items-center justify-between rounded-md border p-4">
          <div className="space-y-1">
            <FieldLabel>تفعيل العرض</FieldLabel>

            <FieldDescription>
              العرض سيكون متاحاً للعملاء فور التفعيل.
            </FieldDescription>
          </div>

          <FieldContent>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FieldContent>

          <FieldError>{fieldState.error?.message}</FieldError>
        </Field>
      )}
    />
  );
}
