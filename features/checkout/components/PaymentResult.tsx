"use client";

import { getUserOrderById } from "@/app/actions";
import FormatCurrency from "@/components/FormatCurrency";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IOrder } from "@/features/orders/types";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  CheckCircle2,
  Package,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaymentResultProps {
  status: "success" | "failed";
}

export function PaymentResult({ status }: PaymentResultProps) {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");

  const { data: order, isLoading } = useQuery<IOrder>({
    queryKey: ["order", orderId],
    queryFn: () => getUserOrderById(orderId!),
    enabled: !!orderId,
  });

  const success = status === "success";

  return (
    <div dir="rtl" className="container mx-auto max-w-2xl px-4 py-16 md:px-6">
      <Card className="overflow-hidden">
        <CardHeader
          className={`items-center gap-3 text-center ${
            success
              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
              : "bg-destructive/10 text-destructive"
          }`}
        >
          {success ? (
            <CheckCircle2 className="h-14 w-14" />
          ) : (
            <XCircle className="h-14 w-14" />
          )}
          <CardTitle className="text-2xl font-bold">
            {success ? "تم إنشاء الطلب بنجاح!" : "تعذر إتمام الدفع"}
          </CardTitle>
          <CardDescription>
            {success
              ? "شكراً لشرائك من متجرنا. تم استلام طلبك وهو قيد المعالجة."
              : "حدث خطأ أثناء عملية الدفع، لم يتم خصم أي مبلغ من حسابك. يمكنك إعادة المحاولة."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 pt-6">
          {isLoading ? (
            <div className="p-6 text-center text-muted-foreground">
              جارِ تحميل تفاصيل الطلب...
            </div>
          ) : order ? (
            <>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  رقم الطلب
                </span>
                <span className="font-semibold">#{order.orderNumber}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  طريقة الدفع
                </span>
                <span className="font-semibold">
                  {order.payment?.paymentMethodName}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  عدد المنتجات
                </span>
                <span className="font-semibold">{order.items.length}</span>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-base font-bold">إجمالي الطلب</span>
                <span className="text-primary text-xl font-bold">
                  <FormatCurrency value={order.totalAmount} />
                </span>
              </div>
            </>
          ) : (
            <div className="p-6 text-center text-muted-foreground">
              تعذر العثور على تفاصيل الطلب.
            </div>
          )}
        </CardContent>

        <CardFooter className="justify-center gap-3">
          {success ? (
            <>
              <Link href="/account/orders">
                <Button>
                  <Package className="size-4" />
                  متابعة طلباتي
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">
                  <ShoppingBag className="size-4" />
                  مواصلة التسوق
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/checkout">
                <Button>
                  <ArrowRight className="size-4" />
                  إعادة المحاولة
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">مواصلة التسوق</Button>
              </Link>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
