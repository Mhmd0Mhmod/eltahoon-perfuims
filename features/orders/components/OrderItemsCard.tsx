import FormatCurrency from "@/components/FormatCurrency";
import { Package } from "lucide-react";
import { IOrderItem } from "../types";

export function OrderItemsCard({ items }: { items: IOrderItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-lg border p-4"
        >
          <div className="flex items-center gap-4">
            <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-lg">
              <Package className="text-muted-foreground h-8 w-8" />
            </div>
            <div>
              <h4 className="font-medium">{item.productName}</h4>
              <p className="text-muted-foreground text-sm">
                الكمية: {item.quantity} × {item.unitPrice.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="text-left">
            <span className="text-lg font-semibold">
              <FormatCurrency value={item.unitPrice * item.quantity} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
