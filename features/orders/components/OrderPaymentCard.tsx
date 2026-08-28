import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { IOrder, PAYMENT_STATUS_CONFIG } from "../types";
import { PAYMENT_METHOD_CONFIG } from "@/features/payments/config";

interface OrderPaymentCardProps {
  payment: IOrder["payment"];
}

export function OrderPaymentCard({ payment }: OrderPaymentCardProps) {
  const statusConfig = PAYMENT_STATUS_CONFIG[payment.paymentStatus];
  const paymentConfig =
    PAYMENT_METHOD_CONFIG[
      payment.paymentMethodName as keyof typeof PAYMENT_METHOD_CONFIG
    ];
  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          بيانات الدفع
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">طريقة الدفع</span>
            <span className="font-medium">
              {paymentConfig?.label ?? payment.paymentMethodName}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">حالة الدفع</span>
            <Badge variant={statusConfig?.variant ?? "outline"}>
              {statusConfig?.label ?? payment.paymentStatus}
            </Badge>
          </div>

          {payment.transactionId && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">
                رقم المعاملة
              </span>
              <span className="font-mono text-sm">{payment.transactionId}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
