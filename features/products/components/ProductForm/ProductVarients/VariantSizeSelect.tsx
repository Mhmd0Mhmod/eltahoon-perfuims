import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductSchema } from "@/features/products/schema";
import { useAdminSizes } from "@/features/size/hooks/useAdminSizes";

import { Controller, useFormContext } from "react-hook-form";
interface VariantSizeSelectProps {
  index: number;
}

function VariantSizeSelect({ index }: VariantSizeSelectProps) {
  const { control } = useFormContext<ProductSchema>();
  const { data: sizes = [] } = useAdminSizes();
  return (
    <Controller
      name={`variants.${index}.sizeId`}
      control={control}
      render={({ field, fieldState }) => (
        <Field className="space-y-2">
          <FieldLabel>اختر من القائمة</FieldLabel>
          <FieldContent>
            <Select
              value={field.value ?? ""}
              items={sizes?.map((size) => ({
                value: size.id,
                label: `${size.size} - ${size.unit}`,
              }))}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="حجم مخصص" />
              </SelectTrigger>
              <SelectContent>
                {sizes?.map((size) => (
                  <SelectItem key={size.id} value={size.id}>
                    {size.size} - {size.unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldContent>
          <FieldError>{fieldState.error?.message}</FieldError>
        </Field>
      )}
    />
  );
}
export default VariantSizeSelect;
