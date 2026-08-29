"use client";

import FormatCurrency from "@/components/FormatCurrency";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@/hooks/useMarketQuery";
import { getAdminDashboardStats } from "@/features/dashboard/services";
import { MonthlyChart } from "@/features/dashboard/components/MonthlyChart";
import { RecentOrders } from "@/features/dashboard/components/RecentOrders";
import { RecentPayments } from "@/features/dashboard/components/RecentPayments";
import {
  CalendarDays,
  CreditCard,
  ShoppingCart,
  Users,
  Wallet,
} from "lucide-react";
import { cloneElement, ReactElement, ReactNode } from "react";
import { useState } from "react";

const CURRENT_YEAR = new Date().getFullYear();

function DashboardPage() {
  const [year, setYear] = useState<string>(String(CURRENT_YEAR));

  const { data, isLoading } = useQuery({
    queryKey: ["admin-dashboard-stats", year],
    queryFn: () => getAdminDashboardStats(Number(year)),
    select: (res) => res.data,
  });

  const stats = {
    year: data?.year ?? Number(year),
    totalUsers: data?.totalUsers ?? 0,
    totalOrders: data?.totalOrders ?? 0,
    totalPayments: data?.totalPayments ?? 0,
    totalRevenue: data?.totalRevenue ?? 0,
    monthlyStats: data?.monthlyStats ?? [],
    recentOrders: data?.recentOrders ?? [],
    recentPayments: data?.recentPayments ?? [],
  };

  const years = Array.from(
    { length: CURRENT_YEAR - 2022 + 1 },
    (_, i) => CURRENT_YEAR - i,
  );

  const totalRevenueDescription =
    stats.monthlyStats.length > 0
      ? `${stats.monthlyStats.length} أشهر بنشاط`
      : "إجمالي الإيرادات لهذه السنة";

  return (
    <div dir="rtl" className="container mx-auto w-full space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            لوحة التحكم
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            نظرة عامة على أداء المتجر وإحصائياته
          </p>
        </div>

        <Select value={year} onValueChange={(value) => value && setYear(value)}>
          <SelectTrigger className="w-32" size="default">
            <SelectValue placeholder="اختر السنة" />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={String(y)}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStat
          title="إجمالي الإيرادات"
          icon={<Wallet />}
          isLoading={isLoading}
          description={totalRevenueDescription}
        >
          <FormatCurrency value={stats.totalRevenue} />
        </DashboardStat>
        <DashboardStat
          title="إجمالي الطلبات"
          icon={<ShoppingCart />}
          isLoading={isLoading}
          description="جميع الطلبات المسجلة"
        >
          {stats.totalOrders.toLocaleString()}
        </DashboardStat>
        <DashboardStat
          title="إجمالي المدفوعات"
          icon={<CreditCard />}
          isLoading={isLoading}
          description="العمليات المالية الناجحة"
        >
          {stats.totalPayments.toLocaleString()}
        </DashboardStat>
        <DashboardStat
          title="إجمالي العملاء"
          icon={<Users />}
          isLoading={isLoading}
          description="العملاء المسجلين في المتجر"
        >
          {stats.totalUsers.toLocaleString()}
        </DashboardStat>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold sm:text-2xl">
                  المبيعات والإيرادات
                </CardTitle>
                <CardDescription>
                  توزيع الإيرادات والطلبات والمدفوعات على مدار سنة {year}
                </CardDescription>
              </div>
              <CalendarDays className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>

          <CardContent>
            {isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <MonthlyChart data={stats.monthlyStats} />
            )}

            <div className="mt-6 flex flex-wrap items-center gap-4 border-t pt-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-sm bg-primary/80" />
                الإيرادات
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-sm bg-blue-500/80" />
                الطلبات
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-sm bg-emerald-500/80" />
                المدفوعات
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold sm:text-2xl">
              أحدث المدفوعات
            </CardTitle>
            <CardDescription>آخر عمليات الدفع المسجلة</CardDescription>
          </CardHeader>

          <CardContent>
            <RecentPayments
              payments={stats.recentPayments}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold sm:text-2xl">
            أحدث الطلبات
          </CardTitle>
          <CardDescription>آخر الطلبات المستلمة في المتجر</CardDescription>
        </CardHeader>

        <CardContent>
          <RecentOrders orders={stats.recentOrders} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
}

export default DashboardPage;

function DashboardStat({
  title,
  icon,
  isLoading,
  description,
  children,
}: {
  title: string;
  icon: ReactElement<{ className?: string }>;
  isLoading?: boolean;
  description?: string;
  children: ReactNode;
}) {
  const styledIcon = cloneElement(icon, {
    className: "h-5 w-5 text-muted-foreground",
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>

        {styledIcon}
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-24" />
        ) : (
          <div className="text-2xl font-bold">{children}</div>
        )}

        {description && (
          <p className="text-muted-foreground text-xs">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
