import FormatCurrency from "@/components/FormatCurrency";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MarketKey } from "@/config/markets";
import { Package } from "lucide-react";
import { IOrderItem } from "../types";

interface OrderItemsTableProps {
  items: IOrderItem[];
  marketKey?: MarketKey;
}

export function OrderItemsTable({ items, marketKey }: OrderItemsTableProps) {
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-right font-semibold">المنتج</TableHead>
              <TableHead className="text-center font-semibold">
                الكمية
              </TableHead>
              <TableHead className="text-right font-semibold">
                سعر الوحدة
              </TableHead>
              <TableHead className="text-right font-semibold">
                المجموع
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
                      <Package className="text-muted-foreground h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">{item.productName}</div>
                      <div className="text-muted-foreground text-sm">
                        SKU: {item.productVariantId}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">{item.quantity}</TableCell>
                <TableCell className="text-right">
                  <FormatCurrency
                    value={item.unitPrice}
                    marketKey={marketKey}
                  />
                </TableCell>
                <TableCell className="text-right font-semibold">
                  <FormatCurrency value={item.subtotal} marketKey={marketKey} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between rounded-lg border p-4">
        <span className="font-semibold">المجموع الفرعي</span>
        <span className="text-primary text-lg font-bold">
          <FormatCurrency value={subtotal} marketKey={marketKey} />
        </span>
      </div>
    </div>
  );
}
