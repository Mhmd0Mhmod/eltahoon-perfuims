import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { IOrder } from "../types";

export function OrderCard({
  order,
  statusConfig,
}: {
  order: IOrder;
  statusConfig: any;
}) {
  const isCancelled = order.status === "CANCELLED";

  return (
    <Card className={cn(isCancelled && "opacity-60")}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">#{order.orderNumber}</CardTitle>
            <CardDescription>{order.items.length} منتج</CardDescription>
          </div>
          <Badge variant={statusConfig.variant} className="gap-1">
            {statusConfig.icon}
            {statusConfig.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Products Preview */}
        <div className="space-y-1">
          {order.items.slice(0, 2).map((item, index) => (
            <div
              key={index}
              className="text-muted-foreground flex justify-between text-sm"
            >
              <span className="truncate">{item.productName}</span>
              <span>× {item.quantity}</span>
            </div>
          ))}
          {order.items.length > 2 && (
            <div className="text-muted-foreground text-xs">
              +{order.items.length - 2} منتج آخر
            </div>
          )}
        </div>

        {/* Total & Action */}
        <div className="flex items-center justify-between border-t pt-3">
          <div>
            <span className="text-muted-foreground text-sm">المجموع: </span>
            <span className="font-bold">{order.totalAmount.toFixed(2)}</span>
          </div>
          <Button variant="outline" size="sm">
            <Link
              href={`/account/orders/${order.orderNumber}`}
              className="flex items-center gap-1"
            >
              التفاصيل
              <ArrowLeft className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
