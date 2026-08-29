"use client";

import FormatCurrency from "@/components/FormatCurrency";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { IDashboardOrder } from "@/features/dashboard/types";
import { OrderStatusBadge } from "@/features/orders/components/OrderStatusBadge";
import { formatDate } from "date-fns";
import { PackageSearch } from "lucide-react";

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

export function RecentOrders({
  orders,
  isLoading,
}: {
  orders: IDashboardOrder[];
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
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <PackageSearch className="mb-2 h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">لا توجد طلبات حتى الآن</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="flex items-center justify-between gap-3 rounded-lg border p-3 text-sm"
            >
              <div className="flex min-w-0 items-center gap-3">
                <Avatar>
                  {order.user?.name ? (
                    <AvatarFallback>{getInitials(order.user.name)}</AvatarFallback>
                  ) : (
                    <AvatarFallback>؟</AvatarFallback>
                  )}
                </Avatar>

                <div className="min-w-0">
                  <p className="truncate font-medium">#{order.orderNumber}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {order.user?.name ?? "عميل"} ·{" "}
                    {formatDate(new Date(order.createdAt), "dd/MM/yyyy")}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <span className="font-semibold">
                  <FormatCurrency
                    value={order.totalAmount}
                    marketKey={order.countryCode}
                  />
                </span>
                <OrderStatusBadge status={order.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
