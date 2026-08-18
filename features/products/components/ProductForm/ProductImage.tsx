"use client";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ProductSchema } from "../../schema";
import { IProduct } from "../../types";

export function ProductImage({ product }: { product?: IProduct }) {
  const { control } = useFormContext<ProductSchema>();
  return (
    <Controller
      name="image"
      control={control}
      render={({ field: { value, onChange, ...field }, fieldState }) => (
        <Field className="space-y-2">
          <FieldLabel>صورة المنتج</FieldLabel>

          <FieldContent>
            <Input
              type="file"
              accept="image/*"
              {...field}
              onChange={(event) => {
                const file = event.target.files?.[0];
                onChange(file);
              }}
            />
          </FieldContent>

          <FieldDescription>
            يمكنك مشاهدة معاينة للصورة الحالية للمنتج.
            <Button
              type="button"
              variant="link"
              size="sm"
              disabled={!product?.imageUrl}
            >
              <Link
                href={product?.imageUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                معاينة الصورة
              </Link>
            </Button>
          </FieldDescription>

          <FieldError>{fieldState.error?.message}</FieldError>
        </Field>
      )}
    />
  );
}
