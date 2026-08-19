import { notFound } from "next/navigation";

import { ORDER_STATUS } from "@/features/orders/types";
import { CustomerHeader } from "@/features/users/components/CustomerHeader";
import { CustomerInfoCard } from "@/features/users/components/CustomerInfoCard";
import { CustomerOrdersCard } from "@/features/users/components/CustomerOrdersCard";
import { CustomerPaymentsCard } from "@/features/users/components/CustomerPaymentsCard";
import { CustomerStats } from "@/features/users/components/CustomerStats";
import { getUser } from "../../actions";

async function CustomerDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const data = await getUser(id);
  if (!data.success) notFound();
  const customer = data.data.data;
  const orders = customer.orders ?? [];
  const payments = customer.payments ?? [];
  const totalOrders = orders.length;
  const completedOrders = orders.filter(
    (order) => order.status === ORDER_STATUS.DELIVERED,
  ).length;
  const totalSpent = orders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0,
  );

  return (
    <div className="container mx-auto space-y-6 p-6">
      <CustomerHeader customer={customer} />
      <CustomerStats
        totalOrders={totalOrders}
        completedOrders={completedOrders}
        totalSpent={totalSpent.toString()}
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <CustomerInfoCard customer={customer} />
        <CustomerOrdersCard orders={orders} limit={10} />
      </div>
      <CustomerPaymentsCard payments={payments} limit={10} />
    </div>
  );
}

export default CustomerDetailsPage;
