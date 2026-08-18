import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ProductSchema } from "@/features/products/schema";

import { Controller, useFormContext } from "react-hook-form";
interface VariantPriceProps {
  index: number;
}

function VariantPrice({ index }: VariantPriceProps) {
  const { control } = useFormContext<ProductSchema>();
  return (
    <Controller
      name={`variants.${index}.price`}
      control={control}
      render={({ field, fieldState }) => (
        <Field className="space-y-2">
          <FieldLabel>السعر</FieldLabel>

          <FieldContent>
            <Input
              type="number"
              placeholder="0.00"
              value={field.value ?? ""}
              onChange={(event) => {
                const value = event.target.value;

                field.onChange(value ? Number(value) : 0);
              }}
            />
          </FieldContent>

          <FieldError>{fieldState.error?.message}</FieldError>
        </Field>
      )}
    />
  );
}
export default VariantPrice;
