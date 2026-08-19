import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  Package,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getUserOrderById } from "@/app/actions";
import { OrderItemsCard } from "@/features/orders/components/OrderItemsCard";
import { OrderSummary } from "@/features/orders/components/OrderSummary";
import { ORDER_STATUS_CONFIG } from "@/features/orders/types";
import { formatDate } from "date-fns";
import { markets } from "@/config/markets";

async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) notFound();

  let order;

  try {
    order = await getUserOrderById(id);
  } catch {
    notFound();
  }

  const statusConfig = ORDER_STATUS_CONFIG[order.status];

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link href="/account/orders" aria-label="العودة إلى الطلبات">
            <Button variant="outline" size="icon">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">
                طلب #{order.orderNumber}
              </h1>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              تفاصيل الطلب ومتابعة حالته
            </p>
          </div>
        </div>

        <Link href="/account/orders">
          <Button variant="outline">جميع الطلبات</Button>
        </Link>
      </div>

      {/* Order Status */}
      <Card className="overflow-hidden">
        <div className="h-1 bg-primary" />

        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Package className="h-6 w-6" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  حالة الطلب الحالية
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <h2 className="text-lg font-bold">
                    {statusConfig?.label ?? order.status}
                  </h2>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-muted/50 px-4 py-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                <span>تاريخ الطلب</span>
              </div>

              <p className="mt-1 font-semibold">
                {formatDate(new Date(order.createdAt), "dd MMMM yyyy")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock3 className="h-5 w-5 text-primary" />
            متابعة الطلب
          </CardTitle>
        </CardHeader>

        <CardContent>
          <OrderStatusTimeline status={order.status} />
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Items */}
        <div className="space-y-6">
          <OrderItemsCard items={order.items} />
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <OrderSummary
            totalAmount={order.totalAmount}
            countryCode={order.countryCode}
          />

          {/* Order Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ShoppingBag className="h-5 w-5 text-primary" />
                معلومات الطلب
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <InfoRow label="رقم الطلب" value={`#${order.orderNumber}`} />

              <InfoRow
                label="عدد المنتجات"
                value={`${order.items.length} منتجات`}
              />

              <InfoRow
                label="الدولة"
                value={
                  markets[
                    order.countryCode.toLowerCase() as keyof typeof markets
                  ]?.name
                }
              />

              <InfoRow
                label="الحالة"
                value={statusConfig?.label ?? order.status}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer Action */}
      <div className="flex justify-center border-t pt-6">
        <Link href="/account/orders" className="gap-2">
          <Button variant="outline">
            <ArrowRight className="h-4 w-4" />
            العودة إلى طلباتي
          </Button>
        </Link>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b last:pb-0 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

function OrderStatusTimeline({ status }: { status: string }) {
  const statuses = [
    {
      key: "PENDING",
      label: "تم استلام الطلب",
    },
    {
      key: "CONFIRMED",
      label: "تم تأكيد الطلب",
    },
    {
      key: "PROCESSING",
      label: "جاري تجهيز الطلب",
    },
    {
      key: "SHIPPED",
      label: "تم شحن الطلب",
    },
    {
      key: "DELIVERED",
      label: "تم توصيل الطلب",
    },
  ];

  const cancelled = status === "CANCELLED";
  const currentIndex = statuses.findIndex((item) => item.key === status);

  if (cancelled) {
    return (
      <div className="flex items-center gap-4 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <Circle className="h-5 w-5 fill-current" />
        </div>

        <div>
          <p className="font-semibold text-destructive">تم إلغاء الطلب</p>
          <p className="mt-1 text-sm text-muted-foreground">
            تم إلغاء هذا الطلب ولا يمكن متابعة عملية الشحن.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="min-w-175 px-2">
        <div className="relative">
          {/* Connector */}
          <div className="absolute right-[8%] left-[8%] top-5 h-0.5 bg-muted">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{
                width:
                  currentIndex <= 0
                    ? "0%"
                    : `${(currentIndex / (statuses.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Steps */}
          <div className="relative flex items-start justify-between">
            {statuses.map((item, index) => {
              const completed = currentIndex >= index;
              const current = currentIndex === index;

              return (
                <div
                  key={item.key}
                  className="flex w-32 flex-col items-center text-center"
                >
                  {/* Icon */}
                  <div
                    className={[
                      "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-background transition-all duration-300",
                      completed
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted text-muted-foreground",
                      current && "ring-4 ring-primary/10",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {completed ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <Circle className="h-4 w-4" />
                    )}
                  </div>

                  {/* Label */}
                  <div className="mt-3">
                    <p
                      className={[
                        "text-sm font-medium",
                        current && "text-primary",
                        completed && !current && "text-foreground",
                        !completed && "text-muted-foreground",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {item.label}
                    </p>

                    {current && (
                      <p className="mt-1 text-xs text-primary/70">
                        الحالة الحالية
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;
