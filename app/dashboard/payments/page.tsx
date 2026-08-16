import { getCookies } from "@/app/actions";
import PaymentsTable from "@/components/admin/payments/PaymentsTable";
import StatsSkeleton from "@/components/shared/stats-skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PaymentAPI } from "@/lib/api/payment";
import { formatCurrency } from "@/lib/utils";
import { Banknote, CheckCircle2, CreditCard, Wallet } from "lucide-react";
import { Suspense } from "react";

function PaymentsPage() {
  return (
    <div className="space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">المدفوعات</h2>
      </div>

      <Suspense fallback={<StatsSkeleton length={4} />}>
        <div className="grid gap-4 md:grid-cols-4">
          <PaymentStatsCard />
        </div>
      </Suspense>

      <Card>
        <CardHeader>
          <CardTitle>سجل المدفوعات</CardTitle>
          <CardDescription>عرض جميع العمليات المالية والمدفوعات</CardDescription>
        </CardHeader>
        <CardContent>
          <PaymentsTable />
        </CardContent>
      </Card>
    </div>
  );
}
async function PaymentStatsCard() {
  const [payments, countryCode] = await Promise.all([
    PaymentAPI.getAdminPaymentsStatus(),
    getCookies("country_code"),
  ]);
  const {
    cashOnDeliveryAmount,
    cashOnDeliveryPayments,
    completedPayments,
    failedPayments,
    pendingPayments,
    refundedPayments,
    totalPayments,
    visaAmount,
    visaPayments,
  } = payments;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">إجمالي المدفوعات</CardTitle>
          <Wallet className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPayments}</div>
          <p className="text-muted-foreground text-xs">عملية دفع مسجلة</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">مدفوعات مكتملة</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedPayments}</div>
          <p className="text-muted-foreground text-xs">تم تحصيلها بنجاح</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">فيزا (المجموع)</CardTitle>
          <CreditCard className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency({ amount: visaAmount, code: countryCode! })}
          </div>
          <p className="text-muted-foreground text-xs">{visaPayments} عملية فيزا</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">الدفع عند الاستلام</CardTitle>
          <Banknote className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency({ amount: cashOnDeliveryAmount, code: countryCode! })}
          </div>
          <p className="text-muted-foreground text-xs">{cashOnDeliveryPayments} عملية دفع نقدي</p>
        </CardContent>
      </Card>
    </>
  );
}
export default PaymentsPage;
