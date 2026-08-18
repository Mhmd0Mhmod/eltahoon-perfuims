import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SIZES_UNITS } from "@/enums/sizes";
import { ProductSchema } from "@/features/products/schema";

import { Controller, useFormContext } from "react-hook-form";
interface VariantCustomSizeProps {
  index: number;
  disabled: boolean;
}

function VariantCustomSize({ index, disabled }: VariantCustomSizeProps) {
  const { control } = useFormContext<ProductSchema>();
  return (
    <div className="grid grid-cols-2 gap-4">
      <Controller
        name={`variants.${index}.size`}
        control={control}
        render={({ field, fieldState }) => (
          <Field className="space-y-2">
            <FieldLabel>الحجم</FieldLabel>

            <FieldContent>
              <Input
                type="number"
                placeholder="الحجم"
                disabled={disabled}
                value={field.value ?? ""}
                onChange={(event) => {
                  const value = event.target.value;

                  field.onChange(value ? Number(value) : undefined);
                }}
              />
            </FieldContent>

            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />

      <Controller
        name={`variants.${index}.unit`}
        control={control}
        render={({ field, fieldState }) => (
          <Field className="space-y-2">
            <FieldLabel>الوحدة</FieldLabel>

            <FieldContent>
              <Select
                value={field.value ?? ""}
                onValueChange={field.onChange}
                disabled={disabled}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر وحدة" />
                </SelectTrigger>

                <SelectContent>
                  {Object.values(SIZES_UNITS).map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldContent>

            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />
    </div>
  );
}
export default VariantCustomSize;
