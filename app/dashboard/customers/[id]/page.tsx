import { UserAvatar } from "@/components/auth/UserAvatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserAPI } from "@/lib/api/user";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { ORDER_STATUS, ORDER_STATUS_CONFIG, PAYMENT_STATUS_CONFIG } from "@/types/order";
import {
  ArrowRight,
  Calendar,
  CreditCard,
  Mail,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  ShoppingCart,
  User,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const roleConfig = {
  ADMIN: {
    label: "مدير",
    variant: "default" as const,
    icon: <ShieldCheck className="h-4 w-4" />,
    bgColor: "bg-teal-500/10 text-teal-600",
  },
  CUSTOMER: {
    label: "مستخدم",
    variant: "secondary" as const,
    icon: <User className="h-4 w-4" />,
    bgColor: "bg-gray-500/10 text-gray-600",
  },
};

async function CustomerDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) notFound();

  let customer;
  try {
    customer = await UserAPI.getUser(id);
  } catch {
    notFound();
  }

  const roleInfo = roleConfig[customer.role as keyof typeof roleConfig];
  const totalOrders = customer.orders?.length || 0;
  const completedOrders =
    customer.orders?.filter((order) => order.status === ORDER_STATUS.DELIVERED).length || 0;
  const totalSpent =
    customer.orders?.reduce((sum, order) => sum + (order.totalAmount || 0), 0) || 0;

  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/customers">
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex items-start gap-4">
            <UserAvatar
              user={{
                name: customer.fullName,
              }}
              className="h-16 w-16 text-xl"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{customer.fullName}</h1>
                <Badge variant={roleInfo.variant} className="flex items-center gap-1">
                  {roleInfo.icon}
                  {roleInfo.label}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1">@{customer.username}</p>
              <div className="text-muted-foreground mt-2 flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>تاريخ التسجيل: {formatDate(customer.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
            <ShoppingCart className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-muted-foreground text-xs">جميع الطلبات المقدمة</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الطلبات المكتملة</CardTitle>
            <Package className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedOrders}</div>
            <p className="text-muted-foreground text-xs">طلبات تم تسليمها</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الإنفاق</CardTitle>
            <CreditCard className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalSpent > 0
                ? formatCurrency({
                    amount: totalSpent,
                    code: customer.orders?.[0]?.countryCode || "EG",
                  })
                : "0"}
            </div>
            <p className="text-muted-foreground text-xs">القيمة الإجمالية للمشتريات</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Customer Info Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCog className="h-5 w-5" />
              معلومات الحساب
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className={cn("rounded-full p-2", roleInfo.bgColor)}>{roleInfo.icon}</div>
                <div className="flex-1">
                  <p className="text-muted-foreground text-sm">الصلاحية</p>
                  <p className="font-medium">{roleInfo.label}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <Mail className="text-muted-foreground mt-0.5 h-5 w-5" />
                <div className="flex-1">
                  <p className="text-muted-foreground text-sm">البريد الإلكتروني</p>
                  <p className="font-medium break-all">{customer.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="text-muted-foreground mt-0.5 h-5 w-5" />
                <div className="flex-1">
                  <p className="text-muted-foreground text-sm">رقم الهاتف</p>
                  <p className="font-medium">{customer.phoneNumber || "غير محدد"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="text-muted-foreground mt-0.5 h-5 w-5" />
                <div className="flex-1">
                  <p className="text-muted-foreground text-sm">العنوان</p>
                  <p className="font-medium">{customer.address || "غير محدد"}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">تاريخ التسجيل</span>
                <div className="flex items-center gap-1">
                  <Calendar className="text-muted-foreground h-4 w-4" />
                  <span className="text-sm font-medium">
                    {new Date(customer.createdAt).toLocaleDateString("ar-EG")}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">آخر تحديث</span>
                <div className="flex items-center gap-1">
                  <Calendar className="text-muted-foreground h-4 w-4" />
                  <span className="text-sm font-medium">
                    {new Date(customer.updatedAt).toLocaleDateString("ar-EG")}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders History Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              سجل الطلبات
            </CardTitle>
            <CardDescription>
              {totalOrders > 0
                ? `عرض آخر ${Math.min(totalOrders, 10)} طلبات للعميل`
                : "لا توجد طلبات حتى الآن"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {totalOrders > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">رقم الطلب</TableHead>
                      <TableHead className="text-right">التاريخ</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">المبلغ</TableHead>
                      <TableHead className="text-right">إجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customer.orders?.slice(0, 10).map((order) => {
                      const statusInfo =
                        ORDER_STATUS_CONFIG[order.status as keyof typeof ORDER_STATUS_CONFIG];
                      return (
                        <TableRow key={order.orderId}>
                          <TableCell className="font-medium">
                            <Button variant={"link"} size={"sm"} asChild>
                              <Link href={`/admin/orders/${order.orderId}`}>{order.orderId}#</Link>
                            </Button>
                          </TableCell>
                          <TableCell>{formatDate(order.createdAt)}</TableCell>
                          <TableCell>
                            <Badge variant={statusInfo?.variant}>{statusInfo.label}</Badge>
                          </TableCell>
                          <TableCell className="font-medium">
                            {formatCurrency({
                              amount: order.totalAmount,
                              code: order.countryCode,
                            })}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/admin/orders/${order.orderId}`}>
                                <Package className="mr-1 h-4 w-4" />
                                عرض
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-muted mb-4 rounded-full p-4">
                  <ShoppingCart className="text-muted-foreground h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold">لا توجد طلبات</h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  هذا العميل لم يقم بأي طلبات حتى الآن
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Payments History Card */}
      {customer.payments && customer.payments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              سجل المدفوعات
            </CardTitle>
            <CardDescription>
              عرض آخر {Math.min(customer.payments.length, 10)} عملية دفع
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">رقم الدفع</TableHead>
                    <TableHead className="text-right">التاريخ</TableHead>
                    <TableHead className="text-right">المبلغ</TableHead>
                    <TableHead className="text-right">طريقة الدفع</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customer.payments.slice(0, 10).map((payment) => {
                    const statusInfo =
                      PAYMENT_STATUS_CONFIG[
                        payment.paymentStatus as keyof typeof PAYMENT_STATUS_CONFIG
                      ];
                    return (
                      <TableRow key={payment.paymentId}>
                        <TableCell className="font-medium">{payment.paymentId}#</TableCell>
                        <TableCell>{formatDate(payment.createdAt)}</TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency({
                            amount: payment.amount,
                            code: payment.countryCode,
                          })}
                        </TableCell>
                        <TableCell>{payment.paymentMethodType}</TableCell>
                        <TableCell>
                          <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default CustomerDetailsPage;
