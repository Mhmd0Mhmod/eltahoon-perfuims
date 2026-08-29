"use client";

import { deleteCoupon, toggleCouponStatus } from "@/app/dashboard/actions";
import AlertDialog from "@/components/AlertDialog";
import Dialog from "@/components/Dialog";
import { Button } from "@/components/ui/button";
import { IOfferCoupon } from "@/features/offers/types";
import { MutationFunctionContext, useMutation } from "@tanstack/react-query";
import { Pencil, Power, PowerOff, Trash } from "lucide-react";
import { toast } from "sonner";
import CouponForm from "./CouponForm";

interface IProps {
  coupon: IOfferCoupon;
}

function CouponsActions({ coupon }: IProps) {
  const { mutate: toggleMutate } = useMutation({
    mutationKey: ["toggle-coupon-status"],
    mutationFn: () => toggleCouponStatus(coupon.id, !coupon.isActive),
    onSuccess: (data, _, __, context) => {
      handleMutationSuccess(data, context);
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationKey: ["delete-coupon"],
    mutationFn: () => deleteCoupon(coupon.id),
    onSuccess: (data, _, __, context) => {
      handleMutationSuccess(data, context);
    },
  });

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center">
        <Dialog>
          <Dialog.Trigger variant="outline">
            <Pencil className="h-4 w-4" />
          </Dialog.Trigger>
          <Dialog.Content title="تعديل الكوبون">
            <CouponForm coupon={coupon} />
          </Dialog.Content>
        </Dialog>

        <Button
          variant={coupon.isActive ? "secondary" : "default"}
          size="sm"
          className="mr-2"
          onClick={() => toggleMutate()}
        >
          {coupon.isActive ? (
            <Power className="h-4 w-4" />
          ) : (
            <PowerOff className="h-4 w-4" />
          )}
        </Button>

        <AlertDialog
          title="حذف الكوبون"
          description={`هل أنت متأكد أنك تريد حذف الكوبون "${coupon.code}"؟ لا يمكن التراجع عن هذا الإجراء.`}
          triggerRender={<Trash className="h-4 w-4" />}
          onConfirm={() => deleteMutate()}
          actionButtonText="حذف"
          triggerVariant="destructive"
        />
      </div>
    </div>
  );
}

function handleMutationSuccess(
  data: { success: boolean; message?: string },
  context: MutationFunctionContext,
) {
  if (data.success) {
    toast.success(data.message);
    context.client.invalidateQueries({
      predicate: (query) =>
        query.queryKey.some(
          (key) =>
            typeof key === "string" && key.toLowerCase().includes("admin-coupon"),
        ),
      type: "active",
    });
  } else {
    toast.error(data.message || "حدث خطأ أثناء تنفيذ العملية");
  }
}

export default CouponsActions;
