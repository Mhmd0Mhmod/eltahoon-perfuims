import FormatCurrency from "@/components/FormatCurrency";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Table from "@/components/Table";
import { ORDER_STATUS_CONFIG } from "@/features/orders/types";
import { Column } from "@/types";
import { formatDate } from "date-fns";
import { Package, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface Order {
  orderId: string;
  createdAt: string | Date;
  status: string;
  totalAmount: number;
  countryCode: string;
}

interface CustomerOrdersCardProps {
  orders?: Order[];
  limit?: number;
}

export function CustomerOrdersCard({
  orders = [],
  limit = 10,
}: CustomerOrdersCardProps) {
  const displayedOrders = orders.slice(0, limit);
  const columns: Column<Order>[] = [
    {
      header: "orderId",
      title: "رقم الطلب",
    },
    {
      header: "createdAt",
      title: "التاريخ",
      valueFormatter: (value) => formatDate(value.createdAt, "dd/MM/yyyy"),
    },
    {
      header: "status",
      title: "الحالة",
      render: (value) => {
        const statusInfo =
          ORDER_STATUS_CONFIG[value.status as keyof typeof ORDER_STATUS_CONFIG];
        return (
          <Badge variant={statusInfo.variant} className="capitalize">
            {statusInfo.label}
          </Badge>
        );
      },
    },
    {
      header: "totalAmount",
      title: "المبلغ",
    },
  ];

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          سجل الطلبات
        </CardTitle>

        <CardDescription>
          {orders.length > 0
            ? `عرض آخر ${Math.min(orders.length, limit)} طلبات للعميل`
            : "لا توجد طلبات حتى الآن"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {orders.length > 0 ? (
          <div className="rounded-md border">
            <Table
              rows={displayedOrders}
              columns={columns}
              className="min-w-fit"
            />
          </div>
        ) : (
          <EmptyOrders />
        )}
      </CardContent>
    </Card>
  );
}
function EmptyOrders() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted mb-4 rounded-full p-4">
        <ShoppingCart className="text-muted-foreground h-8 w-8" />
      </div>

      <h3 className="text-lg font-semibold">لا توجد طلبات</h3>

      <p className="text-muted-foreground mt-2 text-sm">
        هذا العميل لم يقم بأي طلبات حتى الآن
      </p>
    </div>
  );
}
