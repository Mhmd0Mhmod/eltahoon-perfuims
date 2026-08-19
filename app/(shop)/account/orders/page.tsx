import OrdersPage from "@/features/orders/components/account/OrdersPage";
import {IOrderSearchParams} from "@/features/orders/types";


async function page({
  searchParams,
}: {
  searchParams: Promise<IOrderSearchParams>;
}) {
  const params = await searchParams;

  return (
    <div className="space-y-6">
      <OrdersPage searchParams={params} />
    </div>
  );
}

export default page;
