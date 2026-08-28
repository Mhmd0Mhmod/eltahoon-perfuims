"use client";

import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { createOffer, updateOffer } from "@/app/dashboard/actions";
import { IOffer } from "@/features/offers/types";
import { IProduct } from "@/features/products/types";
import { onSuccessMutation } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { OfferFormValues, offerSchema } from "../schema";
import OfferBasicInfo from "./OfferBasicInfo";
import OfferDates from "./OfferDates";
import OfferDiscount from "./OfferDiscount";
import OfferProducts from "./OfferProducts";
import OfferStatus from "./OfferStatus";
import OfferSubmitButton from "./OfferSubmitButton";

interface OfferFormProps {
  offer?: IOffer;
  products: IProduct[];
}

export default function OfferForm({ offer, products }: OfferFormProps) {
  const { mutateAsync: createOfferMutate } = useMutation({
    mutationKey: ["create-offer"],
    mutationFn: createOffer,
    onSuccess: (data, _, __, context) =>
      onSuccessMutation({
        data,
        context,
        successMessage: "تم إنشاء العرض بنجاح",
        key: "offer",
      }),
  });
  const { mutateAsync: updateOfferMutate } = useMutation({
    mutationKey: ["update-offer"],
    mutationFn: updateOffer,
    onSuccess: (data, _, __, context) =>
      onSuccessMutation({
        data,
        context,
        successMessage: "تم تعديل العرض بنجاح",
        key: "offer",
      }),
  });

  const router = useRouter();
  const isEditing = Boolean(offer);

  const form = useForm<OfferFormValues>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      title: offer?.title ?? "",
      description: offer?.description ?? "",
      discountType: offer?.discountType,
      discountValue: offer?.discountValue ?? 0,
      startDate: offer?.startDate ? new Date(offer.startDate) : new Date(),
      endDate: offer?.endDate ? new Date(offer.endDate) : new Date(),
      isActive: offer?.isActive ?? true,
      productVariantIds: offer?.productVariantIds ?? [],
    },
  });

  const onSubmit = useCallback(
    async (data: OfferFormValues) => {
      const loadingId = toast.loading(
        isEditing ? "جاري تحديث العرض..." : "جاري إنشاء العرض...",
      );
      const payload = {
        ...data,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
      };
      const response = isEditing
        ? await updateOfferMutate({ id: offer!.id, data: payload })
        : await createOfferMutate(payload);
      toast.dismiss(loadingId);
      if (response.success) {
        router.push("/dashboard/offers");
      }
    },
    [isEditing, offer, router],
  );

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        dir="rtl"
      >
        <OfferBasicInfo />
        <Separator />
        <OfferDiscount />
        <Separator />
        <OfferDates />
        <Separator />
        <OfferStatus />
        <Separator />
        <OfferProducts products={products} />
        {form.formState.errors.root?.message && (
          <p className="text-sm text-destructive">
            {form.formState.errors.root.message}
          </p>
        )}

        <Separator />

        <OfferSubmitButton isEditing={isEditing} />
      </form>
    </FormProvider>
  );
}
