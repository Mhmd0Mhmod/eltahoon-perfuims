"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import {
  updateOrderStatus,
  updatePaymentStatus,
} from "@/app/dashboard/actions";
import { IOrder, OrderStatus, PaymentStatus } from "../types";

interface OrderStatusUpdateProps {
  order: IOrder;
}

const ORDER_STATUS_OPTIONS: Record<string, string> = {
  PENDING: "قيد الانتظار",
  CONFIRMED: "مؤكد",
  SHIPPED: "تم الشحن",
  DELIVERED: "تم التسليم",
  CANCELLED: "ملغي",
  PAYMENT_FAILED: "فشل الدفع",
};

const PAYMENT_STATUS_OPTIONS: Record<string, string> = {
  PENDING: "قيد الانتظار",
  COMPLETED: "مكتمل",
  FAILED: "فشل",
  REFUNDED: "مسترجع",
};

export function OrderStatusUpdate({ order }: OrderStatusUpdateProps) {
  const [status, setStatus] = useState(order.status);
  const [paymentStatus, setPaymentStatus] = useState(
    order.payment.paymentStatus,
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingPayment, setIsSavingPayment] = useState(false);

  async function handleSaveStatus(nextStatus: OrderStatus | null) {
    if (nextStatus === order.status || nextStatus === null) return;
    setIsSaving(true);
    const result = await updateOrderStatus(Number(order.orderId), nextStatus);
    setIsSaving(false);
    if (!result.success) {
      toast.error(result.message || "تعذر تحديث حالة الطلب");
      return;
    }
    setStatus(nextStatus as IOrder["status"]);
    toast.success("تم تحديث حالة الطلب");
  }

  async function handleSavePayment(nextStatus: PaymentStatus | null) {
    if (nextStatus === order.payment.paymentStatus || nextStatus === null)
      return;
    setIsSavingPayment(true);
    const result = await updatePaymentStatus(Number(order.orderId), nextStatus);
    setIsSavingPayment(false);
    if (!result.success) {
      toast.error(result.message || "تعذر تحديث حالة الدفع");
      return;
    }
    setPaymentStatus(nextStatus as IOrder["payment"]["paymentStatus"]);
    toast.success("تم تحديث حالة الدفع");
  }

  return (
    <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm">حالة الطلب:</span>
        <Select value={status} onValueChange={handleSaveStatus}>
          <SelectTrigger className="w-44" size="sm">
            <SelectValue placeholder="اختار الحالة" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(ORDER_STATUS_OPTIONS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {isSaving && (
          <span className="text-xs text-muted-foreground">جارٍ الحفظ...</span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm">حالة الدفع:</span>
        <Select value={paymentStatus} onValueChange={handleSavePayment}>
          <SelectTrigger className="w-44" size="sm">
            <SelectValue placeholder="اختار الحالة" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(PAYMENT_STATUS_OPTIONS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {isSavingPayment && (
          <span className="text-xs text-muted-foreground">جارٍ الحفظ...</span>
        )}
      </div>
    </div>
  );
}
