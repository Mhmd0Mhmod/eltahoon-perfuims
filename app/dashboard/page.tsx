"use client";

import { formatCurrency } from "@/lib/utils";
import StatsCard from "@/components/StatsCard";
import FormatCurrency from "@/components/FormatCurrency";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchAdminOrders } from "@/features/orders/services";
import { IOrder } from "@/features/orders/types";
import { useQuery } from "@/hooks/useMarketQuery";
import { IPagination } from "@/types/pagination";
import { formatDate } from "date-fns";
import { CreditCard, Package, ShoppingCart, Wallet } from "lucide-react";
import { OrderStatusBadge } from "@/features/orders/components/OrderStatusBadge";

function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-orders", { page: 0 }],
    queryFn: () => fetchAdminOrders({ page: 0 }),
    select: (res) => res.data as IPagination<IOrder>,
  });

  const orders = data?.content ?? [];
  const totalOrders = data?.totalElements ?? 0;
  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0,
  );

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">لوحة التحكم</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="إجمالي الطلبات"
          value={totalOrders}
          description="جميع الطلبات المسجلة"
          icon={<ShoppingCart />}
        />
        <StatsCard
          title="إيرادات الصفحة الحالية"
          value={formatCurrency(totalRevenue)}
          description="مجموع طلبات هذه الصفحة"
          icon={<Wallet />}
        />
        <StatsCard
          title="المنتجات"
          value="-"
          description="عدد المنتجات"
          icon={<Package />}
        />
        <StatsCard
          title="المدفوعات"
          value="-"
          description="عدد المدفوعات"
          icon={<CreditCard />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>أحدث الطلبات</CardTitle>
          <CardDescription>آخر الطلبات المستلمة في المتجر</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center text-sm">
              لا توجد طلبات حتى الآن
            </p>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 5).map((order) => (
                <div
                  key={order.orderId}
                  className="flex items-center justify-between rounded-lg border p-3 text-sm"
                >
                  <div>
                    <p className="font-medium">#{order.orderNumber}</p>
                    <p className="text-muted-foreground text-xs">
                      {order.user.name} ·{" "}
                      {formatDate(new Date(order.createdAt), "dd/MM/yyyy")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <FormatCurrency
                      value={order.totalAmount}
                      marketKey={order.countryCode}
                    />
                    <OrderStatusBadge status={order.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default DashboardPage;
