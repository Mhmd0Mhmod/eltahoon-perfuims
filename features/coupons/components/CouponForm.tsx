"use client";

import { createCoupon, updateCoupon } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { DiscountType, IOfferCoupon } from "@/features/offers/types";
import { cn, onSuccessMutation } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useCallback } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { CouponFormValues, couponSchema } from "../schema";

interface CouponFormProps {
  coupon?: IOfferCoupon;
}

function CouponForm({ coupon }: CouponFormProps) {
  const isEditMode = Boolean(coupon);

  const { mutateAsync: createCouponMutate } = useMutation({
    mutationKey: ["create-coupon"],
    mutationFn: createCoupon,
    onSuccess: (data, _, __, context) =>
      onSuccessMutation({
        data,
        context,
        successMessage: "تم إنشاء الكوبون بنجاح",
        key: "admin-coupons",
      }),
  });
  const { mutateAsync: updateCouponMutate } = useMutation({
    mutationKey: ["update-coupon"],
    mutationFn: ({ id, data }: { id: number; data: CouponFormValues }) => {
      const payload = {
        ...data,
        expiresAt: data.expiresAt.toISOString(),
      };
      return updateCoupon(id, payload);
    },
    onSuccess: (data, _, __, context) =>
      onSuccessMutation({
        data,
        context,
        successMessage: "تم تعديل الكوبون بنجاح",
        key: "admin-coupons",
      }),
  });

  const form = useForm<CouponFormValues>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      code: coupon?.code ?? "",
      discountType: coupon?.discountType,
      discountValue: coupon?.discountValue ?? 0,
      minimumOrderAmount: coupon?.minimumOrderAmount ?? 0,
      maxUsages: coupon?.maxUsages ?? 0,
      expiresAt: coupon?.expiresAt ? new Date(coupon.expiresAt) : undefined,
      isActive: coupon?.isActive ?? true,
    },
  });

  const watchDiscountType = useWatch({ control: form.control, name: "discountType" });

  const handleSubmit = useCallback(
    async (data: CouponFormValues) => {
      const loadingId = toast.loading(
        isEditMode ? "جارى تعديل الكوبون..." : "جارى إنشاء الكوبون...",
      );
      const payload = {
        ...data,
        expiresAt: data.expiresAt.toISOString(),
      };
      if (isEditMode) {
        await updateCouponMutate({ id: coupon!.id, data });
      } else {
        await createCouponMutate(payload);
      }
      toast.dismiss(loadingId);
    },
    [coupon, isEditMode, createCouponMutate, updateCouponMutate],
  );

  const numberValue = (value: number | undefined) =>
    value === undefined ? "" : String(value);

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="space-y-6"
      dir="rtl"
    >
      <Controller
        name="code"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="space-y-2">
            <FieldLabel>كود الكوبون</FieldLabel>

            <FieldContent>
              <Input
                placeholder="مثال: SAVE20"
                className="uppercase"
                {...field}
              />
            </FieldContent>

            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />

      <Controller
        name="discountType"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="space-y-2">
            <FieldLabel>نوع الخصم</FieldLabel>

            <FieldContent>
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر نوع الخصم..." />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value={DiscountType.PERCENTAGE}>
                    نسبة مئوية
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
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="space-y-2">
            <FieldLabel>قيمة الخصم</FieldLabel>

            <FieldContent>
              <Input
                type="number"
                placeholder="أدخل قيمة الخصم..."
                {...field}
                value={numberValue(field.value)}
                onChange={(event) =>
                  field.onChange(
                    event.target.value === ""
                      ? undefined
                      : Number(event.target.value),
                  )
                }
              />
            </FieldContent>

            <p className="text-sm text-muted-foreground">
              {watchDiscountType === DiscountType.PERCENTAGE
                ? "أدخل النسبة المئوية للخصم"
                : "أدخل قيمة الخصم مع مراعاة العملة"}
            </p>

            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Controller
          name="minimumOrderAmount"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="space-y-2">
              <FieldLabel>الحد الأدنى للطلب</FieldLabel>

              <FieldContent>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                  value={numberValue(field.value)}
                  onChange={(event) =>
                    field.onChange(
                      event.target.value === ""
                        ? undefined
                        : Number(event.target.value),
                    )
                  }
                />
              </FieldContent>

              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />

        <Controller
          name="maxUsages"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="space-y-2">
              <FieldLabel>حد الاستخدام</FieldLabel>

              <FieldContent>
                <Input
                  type="number"
                  placeholder="0 = بلا حدود"
                  {...field}
                  value={numberValue(field.value)}
                  onChange={(event) =>
                    field.onChange(
                      event.target.value === ""
                        ? undefined
                        : Number(event.target.value),
                    )
                  }
                />
              </FieldContent>

              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />
      </div>

      <Controller
        name="expiresAt"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="space-y-2">
            <FieldLabel>تاريخ الانتهاء</FieldLabel>

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
                    ? format(field.value, "dd/MM/yyyy", { locale: ar })
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

      <Controller
        name="isActive"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="flex flex-row items-center justify-between rounded-md border p-4">
            <div className="space-y-1">
              <FieldLabel>تفعيل الكوبون</FieldLabel>

              <FieldDescription>
                الكوبون سيكون متاحاً للاستخدام فور التفعيل.
              </FieldDescription>
            </div>

            <FieldContent>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FieldContent>

            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />

      {form.formState.errors.root?.message && (
        <p className="text-sm text-destructive">
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
            ? "تحديث الكوبون"
            : "إضافة الكوبون"}
      </Button>
    </form>
  );
}

export default CouponForm;
