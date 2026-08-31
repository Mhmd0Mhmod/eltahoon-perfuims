import { PaymentResult } from "@/features/checkout/components/PaymentResult";
import { Suspense } from "react";

export default function PaymentFailedPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto max-w-2xl px-4 py-16 text-center text-muted-foreground">
          جارِ التحميل...
        </div>
      }
    >
      <PaymentResult status="failed" />
    </Suspense>
  );
}
