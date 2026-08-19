import FormatCurrency from "@/components/FormatCurrency";
import Table from "@/components/Table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PAYMENT_STATUS_CONFIG } from "@/features/orders/types";
import { PAYMENT_METHOD_CONFIG } from "@/features/payments/config";
import { IPayment } from "@/features/payments/types";
import { Column } from "@/types";
import { formatDate } from "date-fns";
import { CreditCard } from "lucide-react";

interface CustomerPaymentsCardProps {
  payments?: IPayment[];
  limit?: number;
}

export function CustomerPaymentsCard({
  payments = [],
  limit = 10,
}: CustomerPaymentsCardProps) {
  if (!payments.length) return null;

  const displayedPayments = payments.slice(0, limit);
  const columns: Column<IPayment>[] = [
    {
      header: "paymentId",
      title: "رقم الدفع",
    },
    {
      header: "createdAt",
      title: "التاريخ",
      valueFormatter: (value) => formatDate(value.createdAt, "dd/MM/yyyy"),
    },
    {
      header: "amount",
      title: "المبلغ",
      render: (value) => <FormatCurrency value={value.amount} />,
    },
    {
      header: "paymentMethodType",
      title: "طريقة الدفع",
      render: (value) =>
        PAYMENT_METHOD_CONFIG[
          value.paymentMethodType as keyof typeof PAYMENT_METHOD_CONFIG
        ].label,
    },
    {
      header: "paymentStatus",
      title: "الحالة",
      render: (value) => {
        const statusInfo =
          PAYMENT_STATUS_CONFIG[
            value.paymentStatus as keyof typeof PAYMENT_STATUS_CONFIG
          ];
        return (
          <Badge variant={statusInfo.variant} className="capitalize">
            {statusInfo.label}
          </Badge>
        );
      },
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          سجل المدفوعات
        </CardTitle>

        <CardDescription>
          عرض آخر {Math.min(payments.length, limit)} عملية دفع
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table rows={displayedPayments} columns={columns} />
        </div>
      </CardContent>
    </Card>
  );
}
