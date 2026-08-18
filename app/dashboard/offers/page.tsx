"use client";
import FormatCurrency from "@/components/FormatCurrency";
import { Badge } from "@/components/ui/badge";
import TableDashboardPage from "@/features/dashboard/components/TableDashboardPage";
import { getAdminOffers } from "@/features/offers/services";
import { DiscountType, Offer } from "@/features/offers/types";
import { Column } from "@/types";
import { formatDate, isBefore } from "date-fns";
import { CalendarCheck, CalendarX, Percent, Tag } from "lucide-react";

const columns: Column<Offer>[] = [
  {
    header: "title",
    title: "العرض",
    render(row) {
      return (
        <div className="max-w-64 text-right">
          <p className="font-medium">{row.title}</p>
          <p className="line-clamp-1 text-xs text-muted-foreground">
            {row.description}
          </p>
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
    header: "startDate",
    title: "الفترة",
    render(row) {
      return (
        <div className="flex flex-col gap-1 text-right text-sm text-muted-foreground">
          <span>من: {formatDate(row.startDate, "dd/MM/yyyy")}</span>
          <span>إلى: {formatDate(row.endDate, "dd/MM/yyyy")}</span>
        </div>
      );
    },
  },
  {
    header: "isActive",
    title: "الحالة",
    render(row) {
      const now = new Date();
      const startDate = new Date(row.startDate);
      const endDate = new Date(row.endDate);
      const isExpired = isBefore(endDate, now);
      const isUpcoming = isBefore(startDate, now);
      if (!row.isActive) {
        return <Badge variant="secondary">غير نشط</Badge>;
      }
      if (isExpired) {
        return <Badge variant="destructive">منتهي</Badge>;
      }
      if (isUpcoming) {
        return <Badge variant="outline">قادم</Badge>;
      }
      return <Badge variant="default">نشط</Badge>;
    },
  },
  {
    title: "الإجراءات",
    render(row) {
      return (
        <div className="flex items-center justify-center">
          {/* <OfferActionsMenu offer={row} /> */}
        </div>
      );
    },
  },
];

function OffersPage() {
  return (
    <TableDashboardPage<Offer>
      title="العروض"
      description="إدارة جميع العروض والخصومات"
      table={{
        title: "قائمة العروض",
        description: "عرض وإدارة جميع العروض",
      }}
      columns={columns}
      params={{}}
      queryKey="offers"
      queryFn={getAdminOffers}
      stats={[
        {
          title: "إجمالي العروض",
          value: 0,
          description: "جميع العروض المسجلة",
          icon: <Tag />,
        },
        {
          title: "العروض النشطة",
          value: 0,
          description: "العروض المفعلة حالياً",
          icon: <Percent />,
        },
        {
          title: "العروض القادمة",
          value: 0,
          description: "عروض لم تبدأ بعد",
          icon: <CalendarCheck />,
        },
        {
          title: "العروض المنتهية",
          value: 0,
          description: "عروض انتهت صلاحيتها",
          icon: <CalendarX />,
        },
      ]}
      form={{
        to: "offers/new",
        title: "إضافة عرض",
      }}
      emptyState={
        <div className="flex flex-col items-center justify-center py-12">
          <Tag className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="text-lg font-semibold">لا توجد عروض</h3>
          <p className="text-sm text-muted-foreground">ابدأ بإضافة عرض جديد</p>
        </div>
      }
      showSearch
      isPaginated={false}
    />
  );
}

export default OffersPage;
