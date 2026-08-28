import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "@/features/orders/components/OrderStatusBadge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { IOrder } from "../types";

interface OrderDetailsHeaderProps {
  order: IOrder;
  backHref?: string;
}

export function OrderDetailsHeader({
  order,
  backHref = "/dashboard/orders",
}: OrderDetailsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <Link href={backHref}>
          <Button variant="ghost" size="icon">
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">طلب #{order.orderNumber}</h1>
          <p className="text-muted-foreground">تفاصيل الطلب وإدارته</p>
        </div>
      </div>

      <OrderStatusBadge status={order.status} className="text-sm" />
    </div>
  );
}
