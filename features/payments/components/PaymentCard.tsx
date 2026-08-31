import FormatCurrency from "@/components/FormatCurrency";
import { Badge } from "@/components/ui/badge";
import { PAYMENT_STATUS_CONFIG } from "@/features/orders/types";
import { formatDate } from "date-fns";
import { Banknote, CreditCard } from "lucide-react";
import { IPayment } from "../types";

function PaymentCard({ item }: { item: IPayment }) {
  const status = PAYMENT_STATUS_CONFIG[item.paymentStatus] || {
    text: item.paymentStatus,
    variant: "outline" as const,
  };
  const isVisa = item.paymentMethodType === "VISA";
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="flex items-center gap-3">
        <div className="bg-muted flex size-10 items-center justify-center rounded-lg">
          {isVisa ? (
            <CreditCard className="h-5 w-5 text-muted-foreground" />
          ) : (
            <Banknote className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
        <div>
          <p className="font-medium">
            {isVisa ? "دفع بالبطاقة" : "دفع عند الاستلام"}
          </p>
          <p className="text-muted-foreground text-xs">
            {formatDate(
              new Date(item.paymentDate || item.createdAt),
              "dd/MM/yyyy - hh:mm a",
            )}
          </p>
        </div>
      </div>
      <div className="text-left">
        <p className="font-bold">
          {isVisa ? "دفع بالبطاقة" : "دفع عند الاستلام"}
          <FormatCurrency value={item.amount} marketKey={item.countryCode} />
        </p>
        <Badge variant={status.variant}>{status.label}</Badge>
      </div>
    </div>
  );
}
export default PaymentCard;
