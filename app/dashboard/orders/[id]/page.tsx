import { getOrderById } from "@/app/dashboard/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { OrderCustomerCard } from "@/features/orders/components/OrderCustomerCard";
import { OrderDetailsHeader } from "@/features/orders/components/OrderDetailsHeader";
import { OrderItemsTable } from "@/features/orders/components/OrderItemsTable";
import { OrderPaymentCard } from "@/features/orders/components/OrderPaymentCard";
import { OrderSummary } from "@/features/orders/components/OrderSummary";
import { Package } from "lucide-react";
import { notFound } from "next/navigation";

interface OrderDetailsPageProps {
  params: Promise<{ id: string }>;
}

async function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { id } = await params;

  if (!id) notFound();

  const response = await getOrderById(id);

  if (!response.success) notFound();

  const order = response.data.data;

  return (
    <div className="container mx-auto space-y-6 p-6">
      <OrderDetailsHeader order={order} />

      <div className="grid gap-6 lg:grid-cols-2">
        <OrderCustomerCard
          user={order.user}
          shippingAddress={order.shippingAddress}
          phoneNumber={order.phoneNumber}
        />
        <OrderPaymentCard payment={order.payment} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            المنتجات
          </CardTitle>
          <CardDescription>قائمة المنتجات في هذا الطلب</CardDescription>
        </CardHeader>
        <CardContent>
          <OrderItemsTable items={order.items} marketKey={order.countryCode} />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <OrderSummary
          totalAmount={order.totalAmount}
          marketKey={order.countryCode}
        />
      </div>
    </div>
  );
}

export default OrderDetailsPage;
