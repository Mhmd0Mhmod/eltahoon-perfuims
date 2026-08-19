// import { PaginationServer } from "@/components/shared/pagination";
// import TableSkeleton from "@/components/shared/table-skeleton";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { OrderAPI } from "@/lib/api/order";
// import { cn, formatCurrency, formatDate } from "@/lib/utils";
// import { Order, OrderSearchParams, OrderStatus } from "@/types/order";
// import {
//   ArrowLeft,
//   CheckCircle,
//   Clock,
//   Eye,
//   Package,
//   ShoppingBag,
//   Truck,
//   XCircle,
// } from "lucide-react";
// import Link from "next/link";
// import { Suspense } from "react";

// const ORDER_STATUS_CONFIG: Record<
//   OrderStatus,
//   {
//     label: string;
//     variant: "default" | "secondary" | "destructive" | "outline";
//     icon: React.ReactNode;
//     color: string;
//   }
// > = {
//   PENDING: {
//     label: "قيد الانتظار",
//     variant: "secondary",
//     icon: <Clock className="h-4 w-4" />,
//     color: "text-yellow-600",
//   },
//   CONFIRMED: {
//     label: "مؤكد",
//     variant: "default",
//     icon: <CheckCircle className="h-4 w-4" />,
//     color: "text-blue-600",
//   },
//   SHIPPED: {
//     label: "تم الشحن",
//     variant: "outline",
//     icon: <Truck className="h-4 w-4" />,
//     color: "text-purple-600",
//   },
//   DELIVERED: {
//     label: "تم التسليم",
//     variant: "default",
//     icon: <Package className="h-4 w-4" />,
//     color: "text-green-600",
//   },
//   CANCELLED: {
//     label: "ملغي",
//     variant: "destructive",
//     icon: <XCircle className="h-4 w-4" />,
//     color: "text-red-600",
//   },
// };

// async function OrdersPage({
//   searchParams,
// }: {
//   searchParams: Promise<OrderSearchParams>;
// }) {
//   const params = await searchParams;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold">طلباتي</h1>
//           <p className="text-muted-foreground">تتبع جميع طلباتك وحالتها</p>
//         </div>
//         <Button variant="outline">
//           <Link href="/products" className="flex items-center gap-2">
//             <ShoppingBag className="h-4 w-4" />
//             تسوق الآن
//           </Link>
//         </Button>
//       </div>

//       {/* Orders List */}
//       <Suspense
//         fallback={<OrdersSkeleton />}
//         key={Object.values(params).toString()}
//       >
//         <OrdersList searchParams={params} />
//       </Suspense>
//     </div>
//   );
// }

// function OrdersSkeleton() {
//   return (
//     <Card>
//       <CardContent className="p-6">
//         <TableSkeleton columns={5} rows={3} />
//       </CardContent>
//     </Card>
//   );
// }

// async function OrdersList({
//   searchParams,
// }: {
//   searchParams: OrderSearchParams;
// }) {
//   const orders = await OrderAPI.getUserOrders(searchParams);
//   if (orders.content.length === 0) {
//     return <EmptyOrders />;
//   }

//   return (
//     <div className="space-y-4">
//       {/* Mobile Cards View */}
//       <div className="space-y-4 md:hidden">
//         {orders.content.map((order: Order) => (
//           <OrderCard key={order.orderNumber} order={order} />
//         ))}
//       </div>

//       {/* Desktop Table View */}
//       <Card className="hidden md:block">
//         <CardHeader>
//           <CardTitle>سجل الطلبات</CardTitle>
//           <CardDescription>
//             عرض {orders.content.length} من {orders.totalElements} طلب
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="rounded-md border">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-muted/50">
//                   <TableHead className="text-right font-semibold">
//                     رقم الطلب
//                   </TableHead>
//                   <TableHead className="text-right font-semibold">
//                     المنتجات
//                   </TableHead>
//                   <TableHead className="text-right font-semibold">
//                     المبلغ
//                   </TableHead>
//                   <TableHead className="text-right font-semibold">
//                     تاريخ الطلب
//                   </TableHead>
//                   <TableHead className="text-right font-semibold">
//                     الحالة
//                   </TableHead>
//                   <TableHead className="text-center font-semibold">
//                     التفاصيل
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {orders.content.map((order: Order) => {
//                   const statusConfig = ORDER_STATUS_CONFIG[order.status];
//                   const isCancelled = order.status === "CANCELLED";

//                   return (
//                     <TableRow
//                       key={order.orderNumber}
//                       className={cn(
//                         "hover:bg-muted/50",
//                         isCancelled && "opacity-60",
//                       )}
//                     >
//                       <TableCell>
//                         <div className="font-medium">#{order.orderNumber}</div>
//                       </TableCell>
//                       <TableCell>
//                         <div className="max-w-50">
//                           {order.items.slice(0, 2).map((item, index) => (
//                             <div key={index} className="truncate text-sm">
//                               {item.productName} × {item.quantity}
//                             </div>
//                           ))}
//                           {order.items.length > 2 && (
//                             <div className="text-muted-foreground text-xs">
//                               +{order.items.length - 2} منتج آخر
//                             </div>
//                           )}
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         <div className="font-semibold">
//                           {formatCurrency({
//                             amount: order.totalAmount,
//                             code: order.countryCode,
//                           })}
//                         </div>
//                       </TableCell>
//                       <TableCell>{formatDate(order.createdAt)}</TableCell>
//                       <TableCell>
//                         <Badge variant={statusConfig.variant} className="gap-1">
//                           {statusConfig.icon}
//                           {statusConfig.label}
//                         </Badge>
//                       </TableCell>
//                       <TableCell className="text-center">
//                         <Button variant="ghost" size="sm">
//                           <Link
//                             href={`/account/orders/${order.orderId}`}
//                             className="flex items-center gap-1"
//                           >
//                             <Eye className="h-4 w-4" />
//                             عرض
//                           </Link>
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//         <CardFooter>
//           <PaginationServer
//             totalPages={orders.totalPages}
//             currentPage={orders.page}
//             searchParams={searchParams}
//           />
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

// function OrderCard({ order }: { order: Order }) {
//   const statusConfig = ORDER_STATUS_CONFIG[order.status];
//   const isCancelled = order.status === "CANCELLED";

//   return (
//     <Card className={cn(isCancelled && "opacity-60")}>
//       <CardHeader className="pb-3">
//         <div className="flex items-center justify-between">
//           <div>
//             <CardTitle className="text-base">#{order.orderNumber}</CardTitle>
//             <CardDescription>{order.items.length} منتج</CardDescription>
//           </div>
//           <Badge variant={statusConfig.variant} className="gap-1">
//             {statusConfig.icon}
//             {statusConfig.label}
//           </Badge>
//         </div>
//       </CardHeader>
//       <CardContent className="space-y-3">
//         {/* Products Preview */}
//         <div className="space-y-1">
//           {order.items.slice(0, 2).map((item, index) => (
//             <div
//               key={index}
//               className="text-muted-foreground flex justify-between text-sm"
//             >
//               <span className="truncate">{item.productName}</span>
//               <span>× {item.quantity}</span>
//             </div>
//           ))}
//           {order.items.length > 2 && (
//             <div className="text-muted-foreground text-xs">
//               +{order.items.length - 2} منتج آخر
//             </div>
//           )}
//         </div>

//         {/* Total & Action */}
//         <div className="flex items-center justify-between border-t pt-3">
//           <div>
//             <span className="text-muted-foreground text-sm">المجموع: </span>
//             <span className="font-bold">{order.totalAmount.toFixed(2)}</span>
//           </div>
//           <Button variant="outline" size="sm">
//             <Link
//               href={`/account/orders/${order.orderNumber}`}
//               className="flex items-center gap-1"
//             >
//               التفاصيل
//               <ArrowLeft className="h-3 w-3" />
//             </Link>
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// function EmptyOrders() {
//   return (
//     <Card className="py-16">
//       <CardContent className="flex flex-col items-center justify-center text-center">
//         <div className="bg-primary/10 mb-4 rounded-full p-4">
//           <Package className="text-primary h-12 w-12" />
//         </div>
//         <h3 className="mb-2 text-xl font-semibold">لا توجد طلبات بعد</h3>
//         <p className="text-muted-foreground mb-6 max-w-sm">
//           لم تقم بأي طلبات حتى الآن. ابدأ بتصفح منتجاتنا واستمتع بتجربة تسوق
//           مميزة.
//         </p>
//         <Button className="gap-2">
//           <Link href="/products">
//             <ShoppingBag className="h-4 w-4" />
//             تصفح المنتجات
//           </Link>
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }

// export default OrdersPage;
function page() {
  return <div>page</div>;
}
export default page;
