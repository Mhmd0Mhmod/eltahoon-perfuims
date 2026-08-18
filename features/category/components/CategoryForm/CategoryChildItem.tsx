"use client";

import { Controller, Control } from "react-hook-form";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { AddCategorySchema } from "../../schema";

interface CategoryChildItemProps {
  control: Control<AddCategorySchema>;
  index: number;
  onRemove: () => void;
}

export default function CategoryChildItem({
  control,
  index,
  onRemove,
}: CategoryChildItemProps) {
  return (
    <div className="relative space-y-4 rounded-lg border p-4">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="mr-auto flex h-8 w-8 items-center justify-center text-destructive"
        onClick={onRemove}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <div className="grid gap-4">
        {/* Name */}
        <Controller
          name={`children.${index}.name`}
          control={control}
          render={({ field, fieldState }) => (
            <Field className="space-y-2">
              <FieldLabel>اسم التصنيف الفرعي</FieldLabel>
              <FieldContent>
                <Input placeholder="أدخل الاسم..." {...field} />
              </FieldContent>

              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />

        {/* Description */}
        <Controller
          name={`children.${index}.description`}
          control={control}
          render={({ field, fieldState }) => (
            <Field className="space-y-2">
              <FieldLabel>الوصف</FieldLabel>
              <FieldContent>
                <Textarea
                  placeholder="أدخل الوصف..."
                  {...field}
                  value={field.value ?? ""}
                />
              </FieldContent>

              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />

        {/* Active */}
        <Controller
          name={`children.${index}.isActive`}
          control={control}
          render={({ field, fieldState }) => (
            <Field className="flex flex-row items-center justify-between rounded-md border p-3">
              <FieldLabel className="text-sm">نشط</FieldLabel>
              <FieldContent>
                <Switch
                  className="scale-75"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FieldContent>

              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />

        {/* Show on Home */}
        <Controller
          name={`children.${index}.isAtHomePage`}
          control={control}
          render={({ field, fieldState }) => (
            <Field className="flex flex-row items-center justify-between rounded-md border p-3">
              <FieldLabel className="text-sm">
                عرض في الصفحة الرئيسية
              </FieldLabel>

              <FieldContent>
                <Switch
                  className="scale-75"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FieldContent>

              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />
      </div>
    </div>
  );
}
