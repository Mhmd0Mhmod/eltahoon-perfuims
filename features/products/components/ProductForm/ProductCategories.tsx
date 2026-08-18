"use client";

import { Controller, useFormContext } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { ComboBoxMultiple } from "@/components/ComboBoxMultiple";
import { useAdminCategories } from "@/features/category/hooks/useAdminCategories";
import { ProductSchema } from "../../schema";

export function ProductCategories() {
  const { control } = useFormContext<ProductSchema>();
  const { data: categories = [] } = useAdminCategories();
  const options = categories.map((category) => ({
    label: category.name,
    value: category.id.toString(),
  }));

  return (
    <Controller
      name="categoryIds"
      control={control}
      render={({ field, fieldState }) => (
        <Field className="space-y-2">
          <FieldLabel>التصنيفات</FieldLabel>

          <FieldContent>
            <ComboBoxMultiple
              items={options}
              value={field.value ?? []}
              onChange={field.onChange}
              placeholder="اختر التصنيفات"
              notFoundText="لا توجد نتائج"
            />
          </FieldContent>

          <FieldError>{fieldState.error?.message}</FieldError>
        </Field>
      )}
    />
  );
}
