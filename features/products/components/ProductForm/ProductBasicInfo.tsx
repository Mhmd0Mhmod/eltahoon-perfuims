"use client";

import { Control, Controller, useFormContext } from "react-hook-form";

import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProductSchema } from "../../schema";

export function ProductBasicInfo() {
  const { control } = useFormContext<ProductSchema>();
  return (
    <div className="space-y-4">
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="space-y-2">
            <FieldLabel>اسم المنتج</FieldLabel>

            <FieldContent>
              <Input placeholder="اسم المنتج" {...field} />
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
            <FieldLabel>وصف المنتج</FieldLabel>

            <FieldContent>
              <Textarea
                placeholder="وصف المنتج"
                rows={4}
                {...field}
                value={field.value ?? ""}
              />
            </FieldContent>

            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />
    </div>
  );
}
