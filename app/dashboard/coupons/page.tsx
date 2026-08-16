import AddCouponForm from "@/components/admin/coupons/AddCouponForm";
import { CouponActionsMenu } from "@/components/admin/coupons/CouponActionsMenu";
import StatsSkeleton from "@/components/shared/stats-skeleton";
import TableSkeleton from "@/components/shared/table-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OfferCouponAPI } from "@/lib/api/offer";
import { formatCurrency, formatDate } from "@/lib/utils";
import { DiscountType, OfferCoupon } from "@/types/offer";
import { CalendarCheck, CalendarX, Percent, Plus, Search, Tag } from "lucide-react";
import { Suspense } from "react";
import { isBefore } from "date-fns";

function CouponsPage() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">الكوبونات</h1>
          <p className="text-muted-foreground">إدارة جميع الكوبونات وأكواد الخصم</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              إضافة كوبون
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>إضافة كوبون جديد</span>
              </DialogTitle>
            </DialogHeader>
            <AddCouponForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <Suspense fallback={<StatsSkeleton length={4} />}>
        <CouponStatsCards />
      </Suspense>

      {/* Main Table Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="text-right">
              <CardTitle className="text-2xl font-bold">قائمة الكوبونات</CardTitle>
              <CardDescription>عرض وإدارة جميع الكوبونات</CardDescription>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
              <Input placeholder="ابحث عن كوبون..." className="pr-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<TableSkeleton columns={6} rows={5} />}>
            <CouponsTable />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

async function CouponStatsCards() {
  const coupons = await OfferCouponAPI.getAdminOfferCoupons();
  const totalCoupons = coupons.length;
  const activeCoupons = coupons.filter((c) => c.isActive).length;
  const expiredCoupons = coupons.filter((c) => new Date(c.expiresAt) < new Date()).length;
  const validCoupons = coupons.filter(
    (c) => c.isActive && new Date(c.expiresAt) > new Date(),
  ).length;

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">إجمالي الكوبونات</CardTitle>
          <Tag className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCoupons}</div>
          <p className="text-muted-foreground text-xs">جميع الكوبونات المسجلة</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">الكوبونات النشطة</CardTitle>
          <Percent className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeCoupons}</div>
          <p className="text-muted-foreground text-xs">الكوبونات المفعلة حالياً</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">الكوبونات الصالحة</CardTitle>
          <CalendarCheck className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{validCoupons}</div>
          <p className="text-muted-foreground text-xs">كوبونات سارية المفعول</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">الكوبونات المنتهية</CardTitle>
          <CalendarX className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{expiredCoupons}</div>
          <p className="text-muted-foreground text-xs">كوبونات انتهت صلاحيتها</p>
        </CardContent>
      </Card>
    </div>
  );
}

async function CouponsTable() {
  const coupons = await OfferCouponAPI.getAdminOfferCoupons();

  if (coupons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Tag className="text-muted-foreground mb-4 h-12 w-12" />
        <h3 className="text-lg font-semibold">لا توجد كوبونات</h3>
        <p className="text-muted-foreground text-sm">ابدأ بإضافة كوبون جديد</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">الكود</TableHead>
              <TableHead className="text-right">نوع الخصم</TableHead>
              <TableHead className="text-right">قيمة الخصم</TableHead>
              <TableHead className="text-right">الاستخدام</TableHead>
              <TableHead className="text-right">تاريخ الانتهاء</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-center">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.map((coupon) => (
              <CouponTableRow key={coupon.id} coupon={coupon} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function CouponTableRow({ coupon }: { coupon: OfferCoupon }) {
  const isExpired = isBefore(new Date(coupon.expiresAt), new Date());

  const getStatusBadge = () => {
    if (!coupon.isActive) {
      return <Badge variant="secondary">غير نشط</Badge>;
    }
    if (isExpired) {
      return <Badge variant="destructive">منتهي</Badge>;
    }
    return <Badge variant="default">نشط</Badge>;
  };

  const getDiscountDisplay = () => {
    if (coupon.discountType === DiscountType.PERCENTAGE) {
      return `${coupon.discountValue}%`;
    }
    return formatCurrency({ amount: coupon.discountValue, code: "EG" });
  };

  return (
    <TableRow>
      <TableCell>
        <div className="text-right">
          <p className="font-bold tracking-wider">{coupon.code}</p>
          {coupon.minimumOrderAmount > 0 && (
            <p className="text-muted-foreground text-xs">
              الحد الأدنى للطلب:{" "}
              {formatCurrency({ amount: coupon.minimumOrderAmount, code: "SAR" })}
            </p>
          )}
        </div>
      </TableCell>
      <TableCell className="text-right">
        <Badge variant="outline" className="text-xs">
          {coupon.discountType === DiscountType.PERCENTAGE ? "نسبة مئوية" : "مبلغ ثابت"}
        </Badge>
      </TableCell>
      <TableCell className="text-right font-medium">{getDiscountDisplay()}</TableCell>
      <TableCell className="text-right text-sm">
        <div className="flex flex-col gap-1">
          <span>
            {coupon.currentUsages} / {coupon.maxUsages > 0 ? coupon.maxUsages : "بلا حدود"}
          </span>
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground text-right text-sm">
        <span>{formatDate(coupon.expiresAt, "short")}</span>
      </TableCell>
      <TableCell className="text-right">{getStatusBadge()}</TableCell>
      <TableCell>
        <div className="flex items-center justify-center gap-2">
          <CouponActionsMenu coupon={coupon} />
        </div>
      </TableCell>
    </TableRow>
  );
}

export default CouponsPage;
