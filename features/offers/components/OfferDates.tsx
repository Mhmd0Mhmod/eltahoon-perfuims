"use client";

import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Controller, useFormContext } from "react-hook-form";
import { OfferFormValues } from "../schema";

function DateField({
  name,
  label,
}: {
  name: "startDate" | "endDate";
  label: string;
}) {
  const { control } = useFormContext<OfferFormValues>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field className="space-y-2">
          <FieldLabel>{label}</FieldLabel>

          <FieldContent>
            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-right font-normal",
                      !field.value && "text-muted-foreground",
                    )}
                  />
                }
              >
                <CalendarIcon className="ml-2 h-4 w-4" />

                {field.value
                  ? format(field.value, "dd/MM/yyyy", {
                      locale: ar,
                    })
                  : "اختر التاريخ"}
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                />
              </PopoverContent>
            </Popover>
          </FieldContent>

          <FieldError>{fieldState.error?.message}</FieldError>
        </Field>
      )}
    />
  );
}

export default function OfferDates() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">مدة العرض</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <DateField name="startDate" label="تاريخ البداية" />

        <DateField name="endDate" label="تاريخ النهاية" />
      </div>
    </section>
  );
}
