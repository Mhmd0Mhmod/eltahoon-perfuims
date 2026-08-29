"use client";
import FormatCurrency from "@/components/FormatCurrency";
import { Badge } from "@/components/ui/badge";
import CouponsActions from "@/features/coupons/components/CouponsActions";
import CouponForm from "@/features/coupons/components/CouponForm";
import { getAdminOfferCoupons } from "@/features/coupons/services";
import QueryTableDashboardPage from "@/features/dashboard/layout/QueryTableDashboardPage";
import { DiscountType, IOfferCoupon } from "@/features/offers/types";
import { Column } from "@/types";
import { formatDate, isBefore } from "date-fns";
import { CalendarCheck, CalendarX, Percent, Tag } from "lucide-react";
const columns: Column<IOfferCoupon>[] = [
  {
    header: "code",
    title: "الكود",
    render(row) {
      return (
        <div className="text-right">
          <p className="font-bold tracking-wider">{row.code}</p>
          {row.minimumOrderAmount > 0 && (
            <p className="text-xs text-muted-foreground">
              الحد الأدنى للطلب:{" "}
              <FormatCurrency value={row.minimumOrderAmount} />
            </p>
          )}
        </div>
      );
    },
  },
  {
    header: "discountType",
    title: "نوع الخصم",
    render(row) {
      return (
        <Badge variant="outline" className="text-xs">
          {row.discountType === DiscountType.PERCENTAGE
            ? "نسبة مئوية"
            : "مبلغ ثابت"}
        </Badge>
      );
    },
  },
  {
    header: "discountValue",
    title: "قيمة الخصم",
    render(row) {
      if (row.discountType === DiscountType.PERCENTAGE) {
        return <span className="font-medium">{row.discountValue}%</span>;
      }

      return (
        <span className="font-medium">
          <FormatCurrency value={row.discountValue} />
        </span>
      );
    },
  },
  {
    header: "currentUsages",
    title: "الاستخدام",
    render(row) {
      return (
        <span className="text-sm">
          {row.currentUsages} / {row.maxUsages > 0 ? row.maxUsages : "بلا حدود"}
        </span>
      );
    },
  },
  {
    header: "expiresAt",
    title: "تاريخ الانتهاء",
    render(row) {
      return (
        <span className="text-sm text-muted-foreground">
          {formatDate(new Date(row.expiresAt), "dd/MM/yyyy")}
        </span>
      );
    },
  },
  {
    header: "isActive",
    title: "الحالة",
    render(row) {
      const now = new Date();
      const expiresAt = new Date(row.expiresAt);
      const isExpired = isBefore(expiresAt, now);
      if (!row.isActive) {
        return <Badge variant="secondary">غير نشط</Badge>;
      }
      if (isExpired) {
        return <Badge variant="destructive">منتهي</Badge>;
      }
      return <Badge variant="default">نشط</Badge>;
    },
  },
  {
    title: "الإجراءات",
    render(row) {
      return <CouponsActions coupon={row} />;
    },
  },
];

function CouponsPage() {
  return (
    <QueryTableDashboardPage<IOfferCoupon>
      title="الكوبونات"
      description="إدارة جميع الكوبونات وأكواد الخصم"
      table={{
        title: "قائمة الكوبونات",
        description: "عرض وإدارة جميع الكوبونات",
      }}
      columns={columns}
      params={{}}
      queryKey={["admin-coupons"]}
      queryFn={getAdminOfferCoupons}
      stats={[
        {
          title: "إجمالي الكوبونات",
          value: 0,
          description: "جميع الكوبونات المسجلة",
          icon: <Tag className="h-4 w-4 text-muted-foreground" />,
        },
        {
          title: "الكوبونات النشطة",
          value: 0,
          description: "الكوبونات المفعلة حالياً",
          icon: <Percent className="h-4 w-4 text-green-600" />,
        },
        {
          title: "الكوبونات الصالحة",
          value: 0,
          description: "كوبونات سارية المفعول",
          icon: <CalendarCheck className="h-4 w-4 text-blue-600" />,
        },
        {
          title: "الكوبونات المنتهية",
          value: 0,
          description: "كوبونات انتهت صلاحيتها",
          icon: <CalendarX className="h-4 w-4 text-muted-foreground" />,
        },
      ]}
      form={{
        title: "إضافة كوبون",
        description: "إضافة كوبون جديد",
        component: <CouponForm />,
      }}
      emptyState={
        <div className="flex flex-col items-center justify-center py-12">
          <Tag className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="text-lg font-semibold">لا توجد كوبونات</h3>
          <p className="text-sm text-muted-foreground">
            ابدأ بإضافة كوبون جديد
          </p>
        </div>
      }
    />
  );
}

export default CouponsPage;
