import RemoveCustomerButton from "@/components/admin/customers/DeleteCustomerButton";
import { UserAvatar } from "@/components/auth/UserAvatar";
import { PaginationServer } from "@/components/shared/pagination";
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
import { UserAPI } from "@/lib/api/user";
import { cn, formatDate } from "@/lib/utils";
import { Customer } from "@/types/customer";
import { PaginationParams } from "@/types/pageable";
import { Roles } from "@/types/roles";
import { Calendar, Eye, Mail, Phone, Search, Shield, UserCog, Users } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

async function page({ seachParams }: { seachParams: Promise<PaginationParams> }) {
  const params = await seachParams;
  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Stats Cards */}
      <Suspense fallback={<StatsSkeleton length={3} />} >
        <div className="grid gap-4 md:grid-cols-3">
          <CustomerStatsCard />
        </div>
      </Suspense>

      {/* Main Table Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="text-right">
              <CardTitle className="text-2xl font-bold">قائمة العملاء</CardTitle>
              <CardDescription>إدارة وعرض جميع العملاء المسجلين</CardDescription>
            </div>
            <div className="flex w-full gap-2 md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
                <Input placeholder="ابحث عن عميل..." className="pr-10" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<TableSkeleton columns={5} rows={5} />} key={Object.values(params).toString()}>
            <CustomerTable searchParams={params } />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

async function CustomerStatsCard() {
  const customers = await UserAPI.getUsers();
  const totalCustomers = customers.totalElements;
  const adminCount = customers.content.filter((c: Customer) => c.role === Roles.ADMIN).length;
  const userCount = customers.content.filter((c: Customer) => c.role === Roles.USER).length;
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">إجمالي العملاء</CardTitle>
          <Users className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCustomers}</div>
          <p className="text-muted-foreground text-xs">جميع المستخدمين المسجلين</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">المديرين</CardTitle>
          <Shield className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{adminCount}</div>
          <p className="text-muted-foreground text-xs">مستخدمين بصلاحيات إدارية</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">المستخدمين</CardTitle>
          <Users className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{userCount}</div>
          <p className="text-muted-foreground text-xs">مستخدمين عاديين</p>
        </CardContent>
      </Card>
    </>
  );
}
async function CustomerTable({ searchParams }: { searchParams: PaginationParams }) {
  const customers = await UserAPI.getUsers(searchParams);
  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-right font-semibold">العميل</TableHead>
              <TableHead className="text-right font-semibold">معلومات التواصل</TableHead>
              <TableHead className="text-right font-semibold">الدور</TableHead>
              <TableHead className="text-right font-semibold">تاريخ التسجيل</TableHead>
              <TableHead className="text-center font-semibold">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.content.length > 0 ? (
              customers.content.map((customer: Customer) => (
                <TableRow
                  key={customer.id}
                  className={cn(
                    "hover:bg-muted/50",
                    customer.deleted && "bg-muted/10 cursor-not-allowed opacity-50",
                  )}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <UserAvatar
                        user={{
                          name: customer.fullName,
                        }}
                        size="sm"
                      />
                      <div className="text-right">
                        <div className="font-medium">{customer.fullName}</div>
                        <div className="text-muted-foreground text-sm">@{customer.username}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <span dir="ltr">{customer.email}</span>
                        <Mail className="text-muted-foreground h-3.5 w-3.5" />
                      </div>
                      <div className="text-muted-foreground flex items-center gap-2 text-sm">
                        <span dir="ltr">{customer.phoneNumber}</span>
                        <Phone className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={customer.role === Roles.ADMIN ? "default" : "secondary"}
                      className="gap-1"
                    >
                      {customer.role === Roles.ADMIN && <Shield className="h-3 w-3" />}
                      {customer.role === Roles.ADMIN ? "مدير" : "مستخدم"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-sm">
                        {formatDate(customer.createdAt)}
                      </span>
                      <Calendar className="text-muted-foreground h-4 w-4" />
                    </div>
                  </TableCell>
                  <TableCell className="flex items-center justify-end text-left">
                    <Button variant={"ghost"} size="sm" disabled={customer.deleted}>
                      <Link href={`/admin/customers/${customer.id}`}>
                        <Eye />
                      </Link>
                    </Button>
                    <RemoveCustomerButton customerId={customer.id} disabled={customer.deleted} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <UserCog className="text-muted-foreground h-10 w-10" />
                    <p className="text-muted-foreground">لا توجد بيانات عملاء</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <PaginationServer
        totalPages={customers.totalPages}
        currentPage={customers.page}
        searchParams={searchParams}
      />
    </>
  );
}
export default page;
