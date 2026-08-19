// import { OrderStatusSelect } from "@/components/admin/orders/OrderStatusSelect";
// import FormatCurrency from "@/components/FormatCurrency";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { OrderAPI } from "@/lib/api/order";
// import {
//   ORDER_STATUS,
//   OrderStatus,
//   PAYMENT_STATUS_CONFIG,
// } from "@/types/order";
// import {
//   ArrowRight,
//   Calendar,
//   CheckCircle,
//   Clock,
//   CreditCard,
//   Globe,
//   Mail,
//   MapPin,
//   Package,
//   Phone,
//   ShoppingCart,
//   Truck,
//   User,
//   XCircle,
// } from "lucide-react";
// import Link from "next/link";
// import { notFound } from "next/navigation";

// const ORDER_STATUS_CONFIG: Record<
//   OrderStatus,
//   {
//     label: string;
//     variant: "default" | "secondary" | "destructive" | "outline";
//     icon: React.ReactNode;
//     description: string;
//   }
// > = {
//   PENDING: {
//     label: "قيد الانتظار",
//     variant: "secondary",
//     icon: <Clock className="h-5 w-5" />,
//     description: "الطلب في انتظار المعالجة",
//   },
//   CONFIRMED: {
//     label: "مؤكد",
//     variant: "default",
//     icon: <CheckCircle className="h-5 w-5" />,
//     description: "تم تأكيد الطلب وجاري التجهيز",
//   },
//   SHIPPED: {
//     label: "تم الشحن",
//     variant: "outline",
//     icon: <Truck className="h-5 w-5" />,
//     description: "الطلب في الطريق إلى العميل",
//   },
//   DELIVERED: {
//     label: "تم التسليم",
//     variant: "default",
//     icon: <Package className="h-5 w-5" />,
//     description: "تم تسليم الطلب بنجاح",
//   },
//   CANCELLED: {
//     label: "ملغي",
//     variant: "destructive",
//     icon: <XCircle className="h-5 w-5" />,
//     description: "تم إلغاء هذا الطلب",
//   },
// };

// async function OrderDetailsPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;
//   if (!id) notFound();

//   let order;
//   try {
//     order = await OrderAPI.getOrderById(id);
//   } catch {
//     notFound();
//   }

//   const statusConfig = ORDER_STATUS_CONFIG[order.status];
//   const paymentStatusConfig =
//     PAYMENT_STATUS_CONFIG[order.payment.paymentStatus];
//   const isCancelled = order.status === ORDER_STATUS.CANCELLED;
//   const isDelivered = order.status === ORDER_STATUS.DELIVERED;

//   // Format date
//   const formatDate = (dateString: string | null) => {
//     if (!dateString) return "غير محدد";
//     return new Date(dateString).toLocaleDateString("ar-EG", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="container mx-auto space-y-6 p-6">
//       {/* Header */}
//       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <div className="flex items-center gap-4">
//           <Button variant="ghost" size="icon">
//             <Link href="/admin/orders">
//               <ArrowRight className="h-5 w-5" />
//             </Link>
//           </Button>
//           <div>
//             <h1 className="text-2xl font-bold">طلب #{order.orderNumber}</h1>
//             <p className="text-muted-foreground">تفاصيل الطلب وإدارته</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <OrderStatusSelect
//             orderId={order.orderId}
//             currentStatus={order.status}
//           />
//         </div>
//       </div>

//       <div className="grid gap-6 lg:grid-cols-3">
//         {/* Order Status Card */}
//         <Card className="lg:col-span-1">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <ShoppingCart className="h-5 w-5" />
//               حالة الطلب
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex items-center gap-3">
//               <div
//                 className={`rounded-full p-3 ${
//                   isCancelled
//                     ? "bg-destructive/10 text-destructive"
//                     : isDelivered
//                       ? "bg-green-500/10 text-green-600"
//                       : "bg-primary/10 text-primary"
//                 }`}
//               >
//                 {statusConfig.icon}
//               </div>
//               <div>
//                 <Badge variant={statusConfig.variant} className="text-sm">
//                   {statusConfig.label}
//                 </Badge>
//                 <p className="text-muted-foreground mt-1 text-sm">
//                   {statusConfig.description}
//                 </p>
//               </div>
//             </div>

//             <Separator />

//             {/* Order Info */}
//             <div className="space-y-3">
//               <div className="flex items-center justify-between">
//                 <span className="text-muted-foreground text-sm">رقم الطلب</span>
//                 <span className="font-medium">#{order.orderNumber}</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="text-muted-foreground text-sm">
//                   تاريخ الطلب
//                 </span>
//                 <div className="flex items-center gap-1">
//                   <Calendar className="text-muted-foreground h-4 w-4" />
//                   <span className="text-sm font-medium">
//                     {formatDate(order.createdAt)}
//                   </span>
//                 </div>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="text-muted-foreground text-sm">
//                   عدد المنتجات
//                 </span>
//                 <span className="font-medium">{order.items.length} منتج</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="text-muted-foreground text-sm">الدولة</span>
//                 <div className="flex items-center gap-1">
//                   <Globe className="text-muted-foreground h-4 w-4" />
//                   <span className="font-medium">{order.countryCode}</span>
//                 </div>
//               </div>
//             </div>

//             <Separator />

//             {/* Total */}
//             <div className="flex items-center justify-between">
//               <span className="text-lg font-semibold">المجموع الكلي</span>
//               <span className="text-primary text-xl font-bold">
//                 <FormatCurrency value={order.totalAmount} />
//               </span>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Customer Info Card */}
//         <Card className="lg:col-span-1">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <User className="h-5 w-5" />
//               بيانات العميل
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-3">
//               <div className="flex items-start gap-3">
//                 <User className="text-muted-foreground mt-0.5 h-5 w-5" />
//                 <div>
//                   <p className="text-muted-foreground text-sm">الاسم</p>
//                   <p className="font-medium">{order.user.name}</p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3">
//                 <Mail className="text-muted-foreground mt-0.5 h-5 w-5" />
//                 <div>
//                   <p className="text-muted-foreground text-sm">
//                     البريد الإلكتروني
//                   </p>
//                   <p className="font-medium">{order.user.email}</p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3">
//                 <Phone className="text-muted-foreground mt-0.5 h-5 w-5" />
//                 <div>
//                   <p className="text-muted-foreground text-sm">رقم الهاتف</p>
//                   <p className="font-medium">
//                     {order.user.phoneNumber || order.phoneNumber || "غير محدد"}
//                   </p>
//                 </div>
//               </div>
//               <Separator />
//               <div className="flex items-start gap-3">
//                 <MapPin className="text-muted-foreground mt-0.5 h-5 w-5" />
//                 <div>
//                   <p className="text-muted-foreground text-sm">عنوان الشحن</p>
//                   <p className="font-medium">
//                     {order.shippingAddress ||
//                       order.user.shippingAddress ||
//                       "غير محدد"}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Payment Info Card */}
//         <Card className="lg:col-span-1">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <CreditCard className="h-5 w-5" />
//               بيانات الدفع
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-3">
//               <div className="flex items-center justify-between">
//                 <span className="text-muted-foreground text-sm">
//                   طريقة الدفع
//                 </span>
//                 <span className="font-medium">
//                   {order.payment.paymentMethodName}
//                 </span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="text-muted-foreground text-sm">
//                   حالة الدفع
//                 </span>
//                 <Badge variant={paymentStatusConfig.variant}>
//                   {paymentStatusConfig.label}
//                 </Badge>
//               </div>
//               {order.payment.transactionId && (
//                 <div className="flex items-center justify-between">
//                   <span className="text-muted-foreground text-sm">
//                     رقم المعاملة
//                   </span>
//                   <span className="font-mono text-sm">
//                     {order.payment.transactionId}
//                   </span>
//                 </div>
//               )}
//             </div>

//             <Separator />

//             <div className="bg-muted/50 space-y-2 rounded-lg p-3">
//               <div className="flex items-center justify-between text-sm">
//                 <span className="text-muted-foreground">المجموع الفرعي</span>
//                 <span>
//                   <FormatCurrency
//                     value={order.items.reduce(
//                       (sum, item) => sum + item.subtotal,
//                       0,
//                     )}
//                   />
//                 </span>
//               </div>
//               <div className="flex items-center justify-between text-sm">
//                 <span className="text-muted-foreground">الشحن</span>
//                 <span>مجاني</span>
//               </div>
//               <Separator />
//               <div className="flex items-center justify-between">
//                 <span className="font-semibold">الإجمالي</span>
//                 <span className="text-primary font-bold">
//                   <FormatCurrency value={order.totalAmount} />
//                 </span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Order Items Card - Full Width */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Package className="h-5 w-5" />
//             المنتجات
//           </CardTitle>
//           <CardDescription>قائمة المنتجات في هذا الطلب</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="rounded-md border">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-muted/50">
//                   <TableHead className="text-right font-semibold">
//                     المنتج
//                   </TableHead>
//                   <TableHead className="text-center font-semibold">
//                     الكمية
//                   </TableHead>
//                   <TableHead className="text-right font-semibold">
//                     سعر الوحدة
//                   </TableHead>
//                   <TableHead className="text-right font-semibold">
//                     المجموع
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {order.items.map((item, index) => (
//                   <TableRow key={index}>
//                     <TableCell>
//                       <div className="flex items-center gap-3">
//                         <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
//                           <Package className="text-muted-foreground h-5 w-5" />
//                         </div>
//                         <div>
//                           <div className="font-medium">{item.productName}</div>
//                           <div className="text-muted-foreground text-sm">
//                             SKU: {item.productVariantId}
//                           </div>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell className="text-center">
//                       <Badge variant="secondary">{item.quantity}</Badge>
//                     </TableCell>
//                     <TableCell className="text-right">
//                       <FormatCurrency value={item.unitPrice} />
//                     </TableCell>
//                     <TableCell className="text-right font-semibold">
//                       <FormatCurrency value={item.subtotal} />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>

//           {/* Order Summary */}
//           <div className="mt-4 space-y-2 rounded-lg border p-4">
//             <div className="flex items-center justify-between text-sm">
//               <span className="text-muted-foreground">المجموع الفرعي</span>
//               <span>
//                 <FormatCurrency
//                   value={order.items.reduce(
//                     (sum, item) => sum + item.subtotal,
//                     0,
//                   )}
//                 />
//               </span>
//             </div>
//             <div className="flex items-center justify-between text-sm">
//               <span className="text-muted-foreground">الشحن</span>
//               <span>مجاني</span>
//             </div>
//             <Separator />
//             <div className="flex items-center justify-between">
//               <span className="font-semibold">المجموع الكلي</span>
//               <span className="text-primary text-lg font-bold">
//                 <FormatCurrency value={order.totalAmount} />
//               </span>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default OrderDetailsPage;
function page() {
  return <div>page</div>;
}
export default page;
