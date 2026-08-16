import { getCookies } from "@/app/actions";
import { OfferActionsMenu } from "@/components/admin/offers/OfferActionsMenu";
import StatsSkeleton from "@/components/shared/stats-skeleton";
import TableSkeleton from "@/components/shared/table-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OfferAPI } from "@/lib/api/offer";
import { formatCurrency, formatDate } from "@/lib/utils";
import { DiscountType, Offer } from "@/types/offer";
import { CalendarCheck, CalendarX, Percent, Plus, Search, Tag } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function OffersPage() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">العروض</h1>
          <p className="text-muted-foreground">إدارة جميع العروض والخصومات</p>
        </div>
        <Button asChild>
          <Link href={"/admin/offers/new"}>
            <Plus className="mr-2 h-4 w-4" />
            إضافة عرض
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <Suspense fallback={<StatsSkeleton length={4} />}>
        <OfferStatsCards />
      </Suspense>

      {/* Main Table Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="text-right">
              <CardTitle className="text-2xl font-bold">قائمة العروض</CardTitle>
              <CardDescription>عرض وإدارة جميع العروض</CardDescription>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
              <Input placeholder="ابحث عن عرض..." className="pr-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<TableSkeleton columns={6} rows={5} />}>
            <OffersTable />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

async function OfferStatsCards() {
  const offers = await OfferAPI.getAdminOffers();
  const totalOffers = offers.length;
  const activeOffers = offers.filter((o) => o.isActive).length;
  const expiredOffers = offers.filter((o) => new Date(o.endDate) < new Date()).length;
  const upcomingOffers = offers.filter((o) => new Date(o.startDate) > new Date()).length;

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">إجمالي العروض</CardTitle>
          <Tag className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalOffers}</div>
          <p className="text-muted-foreground text-xs">جميع العروض المسجلة</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">العروض النشطة</CardTitle>
          <Percent className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeOffers}</div>
          <p className="text-muted-foreground text-xs">العروض المفعلة حالياً</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">العروض القادمة</CardTitle>
          <CalendarCheck className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{upcomingOffers}</div>
          <p className="text-muted-foreground text-xs">عروض لم تبدأ بعد</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">العروض المنتهية</CardTitle>
          <CalendarX className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{expiredOffers}</div>
          <p className="text-muted-foreground text-xs">عروض انتهت صلاحيتها</p>
        </CardContent>
      </Card>
    </div>
  );
}

async function OffersTable() {
  const offers = await OfferAPI.getAdminOffers();

  if (offers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Tag className="text-muted-foreground mb-4 h-12 w-12" />
        <h3 className="text-lg font-semibold">لا توجد عروض</h3>
        <p className="text-muted-foreground text-sm">ابدأ بإضافة عرض جديد</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">العرض</TableHead>
              <TableHead className="text-right">نوع الخصم</TableHead>
              <TableHead className="text-right">قيمة الخصم</TableHead>
              <TableHead className="text-right">الفترة</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-center">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map((offer) => (
              <OfferTableRow key={offer.id} offer={offer} />
            ))}
          </TableBody>
        </Table>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="text-muted-foreground text-center text-sm">
            إجمالي العروض: {offers.length}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function OfferTableRow({ offer }: { offer: Offer }) {
  const isExpired = new Date(offer.endDate) < new Date();
  const isUpcoming = new Date(offer.startDate) > new Date();

  const getStatusBadge = () => {
    if (!offer.isActive) {
      return <Badge variant="secondary">غير نشط</Badge>;
    }
    if (isExpired) {
      return <Badge variant="destructive">منتهي</Badge>;
    }
    if (isUpcoming) {
      return <Badge variant="outline">قادم</Badge>;
    }
    return <Badge variant="default">نشط</Badge>;
  };

  const getDiscountDisplay = () => {
    if (offer.discountType === DiscountType.PERCENTAGE) {
      return `${offer.discountValue}%`;
    }
    return formatCurrency({ amount: offer.discountValue, code: offer.countryCode });
  };

  return (
    <TableRow>
      <TableCell>
        <div className="text-right">
          <p className="font-medium">{offer.title}</p>
          <p className="text-muted-foreground line-clamp-1 text-xs">{offer.description}</p>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <Badge variant="outline" className="text-xs">
          {offer.discountType === DiscountType.PERCENTAGE ? "نسبة مئوية" : "مبلغ ثابت"}
        </Badge>
      </TableCell>
      <TableCell className="text-right font-medium">{getDiscountDisplay()}</TableCell>
      <TableCell className="text-muted-foreground text-right text-sm">
        <div className="flex flex-col gap-1">
          <span>من: {formatDate(offer.startDate, "short")}</span>
          <span>إلى: {formatDate(offer.endDate, "short")}</span>
        </div>
      </TableCell>
      <TableCell className="text-right">{getStatusBadge()}</TableCell>
      <TableCell>
        <div className="flex items-center justify-center gap-2">
          <OfferActionsMenu offer={offer} />
        </div>
      </TableCell>
    </TableRow>
  );
}

export default OffersPage;
