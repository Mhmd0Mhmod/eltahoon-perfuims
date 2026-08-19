"use client";

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

import { Controller, useFormContext, useWatch } from "react-hook-form";
import { OfferFormValues } from "../schema";
import { DiscountType } from "@/features/offers/types";

export default function OfferDiscount() {
  const { control } = useFormContext<OfferFormValues>();

  const discountType = useWatch({
    control,
    name: "discountType",
  });

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">الخصم</h2>

        <p className="text-sm text-muted-foreground">حدد نوع وقيمة الخصم.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Controller
          name="discountType"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="space-y-2">
              <FieldLabel>نوع الخصم</FieldLabel>

              <FieldContent>
                <Select
                  value={field.value}
                  items={[
                    { value: DiscountType.PERCENTAGE, label: "نسبة مئوية (%)" },
                    { value: DiscountType.FIXED_AMOUNT, label: "مبلغ ثابت" },
                  ]}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="اختر نوع الخصم" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value={DiscountType.PERCENTAGE}>
                      نسبة مئوية (%)
                    </SelectItem>

                    <SelectItem value={DiscountType.FIXED_AMOUNT}>
                      مبلغ ثابت
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FieldContent>

              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />

        <Controller
          name="discountValue"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="space-y-2">
              <FieldLabel>
                {discountType === DiscountType.PERCENTAGE
                  ? "النسبة المئوية"
                  : "المبلغ الثابت"}
              </FieldLabel>

              <FieldContent>
                <Input
                  type="number"
                  min={0}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FieldContent>

              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />
      </div>
    </section>
  );
}
