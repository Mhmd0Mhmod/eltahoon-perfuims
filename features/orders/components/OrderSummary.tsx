import FormatCurrency from "@/components/FormatCurrency";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MarketKey } from "@/config/markets";

export function OrderSummary({
  totalAmount,
  marketKey,
}: {
  totalAmount: number;
  marketKey: MarketKey;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ملخص الطلب</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">المجموع الكلي</span>
          <span className="text-primary text-xl font-bold">
            <FormatCurrency value={totalAmount} marketKey={marketKey} />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
