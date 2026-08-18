import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { ProductSchema } from "@/features/products/schema";

import { Control, Controller, useFormContext } from "react-hook-form";
interface VariantAvailabilityProps {
  index: number;
}

function VariantAvailability({ index }: VariantAvailabilityProps) {
  const { control } = useFormContext<ProductSchema>();
  return (
    <Controller
      name={`variants.${index}.isAvailable`}
      control={control}
      render={({ field, fieldState }) => (
        <Field className="flex flex-row items-center justify-between rounded-lg border p-3">
          <FieldLabel className="m-0">متوفر</FieldLabel>
          <FieldContent>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FieldContent>
          <FieldError>{fieldState.error?.message}</FieldError>
        </Field>
      )}
    />
  );
}

export default VariantAvailability;
