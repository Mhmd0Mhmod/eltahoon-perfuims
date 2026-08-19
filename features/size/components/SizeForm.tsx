"use client";

import { addSize, updateSize } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { sizeSchema, SizeSchema } from "../schema";
import { ISize } from "../types";
import { MutationFunctionContext, useMutation } from "@tanstack/react-query";
import { IAPIResponse } from "@/types/api";
import { onSuccessMutation } from "@/lib/utils";

interface SizeFormProps {
  size?: ISize;
}

function SizeForm({ size }: SizeFormProps) {
  const isEditMode = Boolean(size);
  const { mutateAsync: addSizeMutate } = useMutation({
    mutationKey: ["add-size"],
    mutationFn: addSize,
    onSuccess: (data, _, __, context) =>
      onSuccessMutation({
        data,
        context,
        successMessage: "تم إضافة الحجم بنجاح",
        key: "size",
      }),
  });
  const { mutateAsync: updateSizeMutate } = useMutation({
    mutationKey: ["update-size"],
    mutationFn: ({ id, data }: { id: string; data: SizeSchema }) =>
      updateSize(id, data),
    onSuccess: (data, _, __, context) =>
      onSuccessMutation({
        data,
        context,
        successMessage: "تم تعديل الحجم بنجاح",
        key: "size",
      }),
  });
  const form = useForm<SizeSchema>({
    resolver: zodResolver(sizeSchema),
    defaultValues: {
      size: size?.size ?? 0,
      unit: size?.unit ?? SIZES_UNITS.ML,
    },
  });

  const handleSubmit = useCallback(
    async (data: SizeSchema) => {
      const loadingId = toast.loading(
        isEditMode ? "جارى تعديل الحجم..." : "جارى إضافة الحجم...",
      );
      isEditMode
        ? await updateSizeMutate({ id: size!.id, data })
        : await addSizeMutate(data);
      toast.dismiss(loadingId);
    },
    [form, isEditMode, size],
  );

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="space-y-6"
      dir="rtl"
    >
      <Controller
        name="size"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="space-y-2">
            <FieldLabel>حجم الزجاجة</FieldLabel>

            <FieldContent>
              <Input
                type="number"
                placeholder="أدخل حجم الزجاجة..."
                {...field}
                value={field.value ?? ""}
                onChange={(event) => {
                  const value = event.target.value;
                  field.onChange(value === "" ? undefined : Number(value));
                }}
              />
            </FieldContent>

            <p className="text-sm text-muted-foreground">
              أدخل حجم الزجاجة بالأرقام فقط
            </p>

            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />

      <Controller
        name="unit"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="space-y-2">
            <FieldLabel>الوحدة</FieldLabel>

            <FieldContent>
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر الوحدة..." />
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

            <p className="text-sm text-muted-foreground">
              اختر وحدة قياس الحجم
            </p>

            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />

      {form.formState.errors.root?.message && (
        <p className="text-sm text-red-600">
          {form.formState.errors.root.message}
        </p>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting
          ? "جاري الحفظ..."
          : isEditMode
            ? "تحديث الحجم"
            : "إضافة الحجم"}
      </Button>
    </form>
  );
}

export default SizeForm;
