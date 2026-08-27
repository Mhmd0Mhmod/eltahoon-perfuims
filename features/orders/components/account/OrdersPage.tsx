"use client";

import FormatCurrency from "@/components/FormatCurrency";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PagiedTableDashboardPage from "@/features/dashboard/layout/PagiedTableDashboardPage";
import { Column } from "@/types";
import { formatDate } from "date-fns";
import Link from "next/link";
import { getUserOrders } from "../../services";
import { IOrder, IOrderSearchParams, ORDER_STATUS_CONFIG } from "../../types";
const columns: Column<IOrder>[] = [
  {
    title: "رقم الطلب",
    header: "orderNumber",
    render: (order) => <div className="font-medium">#{order.orderNumber}</div>,
  },
  {
    title: "المنتجات",
    header: "items",
    render: (order) => (
      <div className="max-w-50">
        {order.items.slice(0, 2).map((item, index) => (
          <div key={index} className="truncate text-sm">
            {item.productName} × {item.quantity}
          </div>
        ))}

        {order.items.length > 2 && (
          <div className="text-muted-foreground text-xs">
            +{order.items.length - 2} منتج آخر
          </div>
        )}
      </div>
    ),
  },
  {
    title: "المبلغ",
    header: "totalAmount",
    render: (order) => (
      <div className="font-semibold">
        <FormatCurrency
          value={order.totalAmount}
          marketKey={order.countryCode}
        />
      </div>
    ),
  },
  {
    title: "تاريخ الطلب",
    header: "createdAt",
    valueFormatter(row) {
      return formatDate(row.createdAt, "dd/MM/yyyy");
    },
  },
  {
    title: "الحالة",
    header: "status",
    render: (order) => {
      const statusConfig = ORDER_STATUS_CONFIG[order.status];

      return (
        <Badge variant={statusConfig.variant} className="gap-1">
          {statusConfig.label}
        </Badge>
      );
    },
  },
  {
    title: "التفاصيل",
    render: (order) => (
      <Link
        href={`/account/orders/${order.orderId}`}
        className="text-primary hover:underline"
      >
        <Button variant="ghost" size="sm">
          عرض
        </Button>
      </Link>
    ),
  },
];

function OrdersPage({ searchParams }: { searchParams: IOrderSearchParams }) {
  return (
    <PagiedTableDashboardPage<IOrder>
      title="طلباتي"
      description="تتبع جميع طلباتك وحالتها"
      queryFn={getUserOrders}
      columns={columns}
      queryKey={["user-orders"]}
      table={{
        title: "سجل الطلبات",
        description: "عرض جميع الطلبات الخاصة بك",
      }}
      params={searchParams}
    />
  );
}
export default OrdersPage;
