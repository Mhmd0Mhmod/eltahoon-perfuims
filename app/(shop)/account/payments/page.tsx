"use client";
import PagiedCardsDashboardPage from "@/features/dashboard/layout/PagiedCardsDashboardPage";
import PaymentCard from "@/features/payments/components/PaymentCard";
import { getMyPayments } from "@/features/payments/services";

function page() {
  return (
    <PagiedCardsDashboardPage
      queryKey={["account", "payments"]}
      queryFn={getMyPayments}
      title="دفعاتي"
      description="سجل جميع عمليات الدفع الخاصة بك"
      renderCard={PaymentCard}
      gridColumns={2}
    />
  );
}
export default page;
