"use client";

import FormatCurrency from "@/components/FormatCurrency";
import { Badge } from "@/components/ui/badge";
import TableDashboardPage from "@/features/dashboard/components/TableDashboardPage";
import { getAdminPayments } from "@/features/payments/services";
import { IPayment } from "@/features/payments/types";
import { Column } from "@/types";
import { formatDate } from "date-fns";
import { Banknote, CheckCircle2, CreditCard, Wallet } from "lucide-react";

const columns: Column<IPayment>[] = [
  {
    header: "paymentId",
    title: "رقم العملية",
    render(row) {
      return <span className="font-mono text-xs">{row.paymentId}</span>;
    },
  },
  {
    header: "username",
    title: "العميل",
    render(row) {
      return <span className="font-medium">{row.username}</span>;
    },
  },
  {
    header: "paymentMethodType",
    title: "طريقة الدفع",
    render(row) {
      const isVisa = row.paymentMethodType === "VISA";
      return (
        <div className="flex items-center gap-2">
          {isVisa ? (
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Banknote className="h-4 w-4 text-muted-foreground" />
          )}
          <span>{isVisa ? "فيزا" : "الدفع عند الاستلام"}</span>
        </div>
      );
    },
  },
  {
    header: "amount",
    title: "المبلغ",
    render(row) {
      return (
        <span className="font-bold">
          <FormatCurrency value={row.amount} />
        </span>
      );
    },
  },
  {
    header: "paymentStatus",
    title: "الحالة",
    render(row) {
      const statusMap = {
        COMPLETED: { text: "مكتمل", variant: "default" as const },
        PENDING: { text: "قيد الانتظار", variant: "outline" as const },
        FAILED: { text: "فاشلة", variant: "destructive" as const },
        REFUNDED: { text: "مسترجع", variant: "secondary" as const },
      };

      const currentStatus = statusMap[row.paymentStatus] || {
        text: row.paymentStatus,
        variant: "outline" as const,
      };

      return (
        <Badge variant={currentStatus.variant}>{currentStatus.text}</Badge>
      );
    },
  },
  {
    header: "createdAt",
    title: "التاريخ والوقت",
    render(row) {
      return (
        <span className="text-sm text-muted-foreground">
          {formatDate(new Date(row.createdAt), "dd/MM/yyyy - hh:mm a")}
        </span>
      );
    },
  },
];

function PaymentsPage() {
  const statsCards = [
    {
      title: "إجمالي المدفوعات",
      value: 0,
      description: "عملية دفع مسجلة",
      icon: <Wallet />,
    },
    {
      title: "مدفوعات مكتملة",
      value: 0,
      description: "تم تحصيلها بنجاح",
      icon: <CheckCircle2 className="text-green-600" />,
    },
    {
      title: "فيزا (المجموع)",
      value: 0,
      description: `${0} عملية فيزا`,
      icon: <CreditCard />,
    },
    {
      title: "الدفع عند الاستلام",
      value: 0,
      description: `${0} عملية دفع نقدي`,
      icon: <Banknote />,
    },
  ];

  return (
    <TableDashboardPage<IPayment>
      title="المدفوعات"
      description="إدارة ومتابعة العمليات المالية المسجلة في النظام"
      table={{
        title: "سجل المدفوعات",
        description: "عرض جميع العمليات المالية والمدفوعات التفصيلية",
      }}
      columns={columns}
      params={{}}
      queryKey="admin-payments"
      queryFn={getAdminPayments}
      stats={statsCards}
      emptyState={
        <div className="flex flex-col items-center justify-center py-12">
          <Wallet className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="text-lg font-semibold">لا توجد عمليات دفع</h3>
          <p className="text-sm text-muted-foreground">
            لم يتم تسجيل أي عمليات مالية بعد
          </p>
        </div>
      }
    />
  );
}

export default PaymentsPage;
