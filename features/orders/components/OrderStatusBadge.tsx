import { Badge } from "@/components/ui/badge";
import { ORDER_STATUS_CONFIG, OrderStatus } from "@/features/orders/types";

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const config = ORDER_STATUS_CONFIG[status];

  return (
    <Badge variant={config?.variant ?? "outline"} className={className}>
      {config?.label ?? status}
    </Badge>
  );
}
