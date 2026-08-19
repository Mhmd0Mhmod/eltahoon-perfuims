// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { OrderAPI } from "@/lib/api/order";
// import { formatCurrency } from "@/lib/utils";
// import { ORDER_STATUS, OrderStatus } from "@/types/order";
// import {
//   ArrowRight,
//   CheckCircle,
//   Clock,
//   Globe,
//   Package,
//   ShoppingBag,
//   Truck,
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
//     color: string;
//   }
// > = {
//   PENDING: {
//     label: "قيد الانتظار",
//     variant: "secondary",
//     icon: <Clock className="h-6 w-6" />,
//     description: "طلبك في انتظار المعالجة",
//     color: "bg-yellow-500/10 text-yellow-600",
//   },
//   CONFIRMED: {
//     label: "مؤكد",
//     variant: "default",
//     icon: <CheckCircle className="h-6 w-6" />,
//     description: "تم تأكيد طلبك وجاري التجهيز",
//     color: "bg-blue-500/10 text-blue-600",
//   },
//   SHIPPED: {
//     label: "تم الشحن",
//     variant: "outline",
//     icon: <Truck className="h-6 w-6" />,
//     description: "طلبك في الطريق إليك",
//     color: "bg-purple-500/10 text-purple-600",
//   },
//   DELIVERED: {
//     label: "تم التسليم",
//     variant: "default",
//     icon: <Package className="h-6 w-6" />,
//     description: "تم تسليم طلبك بنجاح",
//     color: "bg-green-500/10 text-green-600",
//   },
//   CANCELLED: {
//     label: "ملغي",
//     variant: "destructive",
//     icon: <XCircle className="h-6 w-6" />,
//     description: "تم إلغاء هذا الطلب",
//     color: "bg-red-500/10 text-red-600",
//   },
// };

// // Order status timeline steps
// const ORDER_STEPS: OrderStatus[] = [
//   "PENDING",
//   "CONFIRMED",
//   "SHIPPED",
//   "DELIVERED",
// ];

// async function OrderDetailsPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;
//   if (!id) notFound();

//   let order;
//   try {
//     order = await OrderAPI.getUserOrderById(id);
//   } catch {
//     notFound();
//   }

//   const statusConfig = ORDER_STATUS_CONFIG[order.status];
//   const isCancelled = order.status === ORDER_STATUS.CANCELLED;
//   const currentStepIndex = ORDER_STEPS.indexOf(order.status);

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center gap-4">
//         <Button variant="ghost" size="icon">
//           <Link href="/account/orders">
//             <ArrowRight className="h-5 w-5" />
//           </Link>
//         </Button>
//         <div>
//           <h1 className="text-2xl font-bold">طلب #{order.orderNumber}</h1>
//           <p className="text-muted-foreground">تفاصيل طلبك</p>
//         </div>
//       </div>

//       {/* Status Timeline Card */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <ShoppingBag className="h-5 w-5" />
//             حالة الطلب
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           {isCancelled ? (
//             // Cancelled Order Display
//             <div className="border-destructive/20 bg-destructive/5 flex items-center gap-4 rounded-lg border p-4">
//               <div className={`rounded-full p-3 ${statusConfig.color}`}>
//                 {statusConfig.icon}
//               </div>
//               <div>
//                 <Badge variant="destructive" className="mb-1">
//                   {statusConfig.label}
//                 </Badge>
//                 <p className="text-muted-foreground text-sm">
//                   {statusConfig.description}
//                 </p>
//               </div>
//             </div>
//           ) : (
//             // Order Progress Timeline
//             <div className="relative">
//               <div className="flex justify-between">
//                 {ORDER_STEPS.map((step, index) => {
//                   const stepConfig = ORDER_STATUS_CONFIG[step];
//                   const isCompleted = index <= currentStepIndex;
//                   const isCurrent = index === currentStepIndex;

//                   return (
//                     <div
//                       key={step}
//                       className="relative flex flex-1 flex-col items-center"
//                     >
//                       {/* Connector Line */}
//                       {index < ORDER_STEPS.length - 1 && (
//                         <div
//                           className={`absolute top-5 right-1/2 h-1 w-full ${
//                             index < currentStepIndex ? "bg-primary" : "bg-muted"
//                           }`}
//                         />
//                       )}

//                       {/* Step Circle */}
//                       <div
//                         className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
//                           isCompleted
//                             ? "border-primary bg-primary text-primary-foreground"
//                             : "border-muted bg-background text-muted-foreground"
//                         } ${isCurrent ? "ring-primary/20 ring-4" : ""}`}
//                       >
//                         {stepConfig.icon}
//                       </div>

//                       {/* Step Label */}
//                       <span
//                         className={`mt-2 text-center text-xs ${
//                           isCompleted ? "font-medium" : "text-muted-foreground"
//                         }`}
//                       >
//                         {stepConfig.label}
//                       </span>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Current Status Description */}
//               <div className="mt-6 rounded-lg border p-4 text-center">
//                 <p className="text-muted-foreground">
//                   {statusConfig.description}
//                 </p>
//               </div>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       <div className="grid gap-6 md:grid-cols-2">
//         {/* Order Items Card */}
//         <Card className="md:col-span-2">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Package className="h-5 w-5" />
//               المنتجات
//             </CardTitle>
//             <CardDescription>
//               {order.items.length} منتج في هذا الطلب
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {order.items.map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center justify-between rounded-lg border p-4"
//                 >
//                   <div className="flex items-center gap-4">
//                     <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-lg">
//                       <Package className="text-muted-foreground h-8 w-8" />
//                     </div>
//                     <div>
//                       <h4 className="font-medium">{item.productName}</h4>
//                       <p className="text-muted-foreground text-sm">
//                         الكمية: {item.quantity} × {item.unitPrice.toFixed(2)}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="text-left">
//                     <span className="text-lg font-semibold">
//                       {item.subtotal.toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Order Summary Card */}
//         <Card>
//           <CardHeader>
//             <CardTitle>ملخص الطلب</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex items-center justify-between">
//               <span className="text-lg font-semibold">المجموع الكلي</span>
//               <span className="text-primary text-xl font-bold">
//                 {formatCurrency({
//                   amount: order.totalAmount,
//                   code: order.countryCode,
//                 })}
//               </span>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Order Info Card */}
//         <Card>
//           <CardHeader>
//             <CardTitle>معلومات الطلب</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">رقم الطلب</span>
//               <span className="font-medium">#{order.orderNumber}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">الدولة</span>
//               <div className="flex items-center gap-1">
//                 <Globe className="text-muted-foreground h-4 w-4" />
//                 <span className="font-medium">{order.countryCode}</span>
//               </div>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">الحالة</span>
//               <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Back to Orders Button */}
//       <div className="flex justify-center">
//         <Button variant="outline">
//           <Link href="/account/orders" className="flex items-center gap-2">
//             <ArrowRight className="h-4 w-4" />
//             العودة إلى طلباتي
//           </Link>
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default OrderDetailsPage;
function page() {
  return <div>page</div>;
}
export default page;
