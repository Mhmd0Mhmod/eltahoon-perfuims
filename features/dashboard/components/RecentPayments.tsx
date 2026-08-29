"use client";

import FormatCurrency from "@/components/FormatCurrency";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { IDashboardPayment } from "@/features/dashboard/types";
import { PAYMENT_STATUS_CONFIG } from "@/features/orders/types";
import { formatDate } from "date-fns";
import { Banknote, CreditCard, Wallet } from "lucide-react";

export function RecentPayments({
  payments,
  isLoading,
}: {
  payments: IDashboardPayment[];
  isLoading: boolean;
}) {
  return (
    <div className="space-y-3">
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : payments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <Wallet className="mb-2 h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            لا توجد مدفوعات حتى الآن
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {payments.map((payment) => {
            const isVisa = payment.paymentMethodType === "VISA";
            const statusConfig = PAYMENT_STATUS_CONFIG[payment.paymentStatus];

            return (
              <div
                key={payment.paymentId}
                className="flex items-center justify-between gap-3 rounded-lg border p-3 text-sm"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    {isVisa ? (
                      <CreditCard className="h-4 w-4" />
                    ) : (
                      <Banknote className="h-4 w-4" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-medium">{payment.username}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {isVisa ? "فيزا" : "الدفع عند الاستلام"} ·{" "}
                      {formatDate(
                        new Date(payment.createdAt),
                        "dd/MM/yyyy - hh:mm a",
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <FormatCurrency
                    value={payment.amount}
                    marketKey={payment.countryCode}
                  />
                  <Badge variant={statusConfig.variant}>
                    {statusConfig.label}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
