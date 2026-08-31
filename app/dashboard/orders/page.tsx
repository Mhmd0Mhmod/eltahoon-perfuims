"use client";

import { formatDate } from "date-fns";
import { Clock, Package, ShoppingCart, Truck } from "lucide-react";

import FormatCurrency from "@/components/FormatCurrency";
import { Badge } from "@/components/ui/badge";

import TableDashboardPage from "@/features/dashboard/layout/TableDashboardPage";
import { fetchAdminOrders } from "@/features/orders/services";
import {
  ORDER_STATUS_CONFIG,
  type IOrder,
  type IOrderSearchParams,
} from "@/features/orders/types";

import type { Column } from "@/types";
import PagiedTableDashboardPage from "@/features/dashboard/layout/PagiedTableDashboardPage";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const columns: Column<IOrder>[] = [
  {
    header: "orderId",
    title: "رقم الطلب",
    render(row) {
      return (
        <Link href={`/dashboard/orders/${row.orderId}`} className="font-medium">
          <Button variant="link" className="p-0">
            #{row.orderId}
          </Button>
        </Link>
      );
    },
  },

  {
    title: "العميل",
    render(row) {
      return (
        <Link
          href={`/dashboard/customers/${row.user.userId}`}
          className="font-medium"
        >
          <Button variant="link" className="p-0">
            {row.user.name}
          </Button>
        </Link>
      );
    },
  },
  {
    header: "totalAmount",
    title: "الإجمالي",
    render(row) {
      return (
        <span className="font-bold">
          <FormatCurrency value={row.totalAmount} marketKey={row.countryCode} />
        </span>
      );
    },
  },

  {
    header: "status",
    title: "الحالة",
    render(row) {
      const status = ORDER_STATUS_CONFIG[row.status];
      return <Badge variant={status.variant}>{status.label}</Badge>;
    },
  },
  {
    header: "createdAt",
    title: "تاريخ الطلب",
    render(row) {
      return (
        <span className="text-sm text-muted-foreground">
          {formatDate(new Date(row.createdAt), "dd/MM/yyyy - hh:mm a")}
        </span>
      );
    },
  },
];

interface OrdersClientPageProps {
  searchParams: IOrderSearchParams;
}

function OrdersClientPage() {
  const statsCards = [
    {
      title: "إجمالي الطلبات",
      value: 0,
      description: "جميع الطلبات المستلمة",
      icon: <ShoppingCart />,
    },
    {
      title: "قيد الانتظار",
      value: 0,
      description: "طلبات تحتاج معالجة",
      icon: <Clock />,
    },
    {
      title: "تم الشحن",
      value: 0,
      description: "طلبات في الطريق",
      icon: <Truck />,
    },
    {
      title: "تم التسليم",
      value: 0,
      description: "طلبات مكتملة",
      icon: <Package />,
    },
  ];

  return (
    <PagiedTableDashboardPage<IOrder>
      title="الطلبات"
      description="متابعة وإدارة جميع طلبات العملاء وحالات الشحن"
      table={{
        title: "إدارة الطلبات",
        description: "عرض جميع طلبات العملاء وحالات الشحن والتسليم",
      }}
      columns={columns}
      params={{}}
      queryKey={["admin-orders"]}
      queryFn={fetchAdminOrders}
      stats={statsCards}
      emptyState={
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ShoppingCart className="mb-4 h-12 w-12 text-muted-foreground" />

          <h3 className="text-lg font-semibold">لا توجد طلبات مسجلة</h3>

          <p className="text-sm text-muted-foreground">
            لم يستقبل النظام أي طلبات تطابق الفلترة الحالية
          </p>
        </div>
      }
    />
  );
}

export default OrdersClientPage;
