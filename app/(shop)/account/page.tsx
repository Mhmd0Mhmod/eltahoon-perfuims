// import { getUser } from "@/app/(auth)/actions";
// import { UserAvatar } from "@/components/auth/UserAvatar";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { formatDate } from "@/lib/utils";
// import {
//   ArrowLeft,
//   Calendar,
//   Mail,
//   MapPin,
//   Package,
//   Phone,
//   Settings,
//   ShoppingBag,
//   Sparkles,
// } from "lucide-react";
// import Link from "next/link";
// import { redirect } from "next/navigation";

// const QUICK_LINKS = [
//   {
//     href: "/account/orders",
//     label: "طلباتي",
//     description: "تتبع جميع طلباتك وحالتها",
//     icon: Package,
//     color: "from-blue-500 to-blue-600",
//     bgColor: "bg-blue-500/10",
//     iconColor: "text-blue-500",
//   },
//   {
//     href: "/account/cart",
//     label: "سله الشراء",
//     description: "",
//     icon: ShoppingBag,
//     color: "from-rose-500 to-rose-600",
//     bgColor: "bg-rose-500/10",
//     iconColor: "text-rose-500",
//   },
//   {
//     href: "/account/settings",
//     label: "الإعدادات",
//     description: "تخصيص حسابك وتفضيلاتك",
//     icon: Settings,
//     color: "from-violet-500 to-violet-600",
//     bgColor: "bg-violet-500/10",
//     iconColor: "text-violet-500",
//   },
// ];

// async function AccountPage() {
//   const user = await getUser();

//   if (!user) {
//     redirect("/login");
//   }

//   return (
//     <div className="space-y-8">
//       {/* Hero Profile Section */}
//       <div className="relative overflow-hidden rounded-2xl">
//         {/* linear Background */}
//         <div className="from-primary/20 via-primary/10 to-background absolute inset-0 bg-linear-to-br" />
//         <div className="bg-primary/5 absolute -top-24 -right-24 h-48 w-48 rounded-full blur-3xl" />
//         <div className="bg-secondary/10 absolute -bottom-24 -left-24 h-48 w-48 rounded-full blur-3xl" />

//         <div className="relative p-6 sm:p-8">
//           <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
//             {/* Avatar Section */}
//             <div className="relative">
//               <div className="from-primary to-primary/60 absolute -inset-1 rounded-full bg-linear-to-br opacity-75 blur" />
//               <div className="relative">
//                 <UserAvatar
//                   user={user}
//                   size="lg"
//                   className="h-24 w-24 border-4 border-white shadow-xl"
//                 />
//               </div>
//             </div>

//             {/* User Info */}
//             <div className="flex-1 text-center sm:text-right">
//               <div className="mb-2 flex items-center justify-center gap-2 sm:justify-start">
//                 <h1 className="text-2xl font-bold sm:text-3xl">
//                   {user.fullName || user.username}
//                 </h1>
//                 <Sparkles className="text-primary h-5 w-5" />
//               </div>

//               <div className="text-muted-foreground mb-4 flex flex-wrap items-center justify-center gap-4 text-sm sm:justify-start">
//                 <span className="flex items-center gap-1">
//                   <Mail className="h-4 w-4" />
//                   {user.email}
//                 </span>
//                 {user.phoneNumber && (
//                   <span className="flex items-center gap-1">
//                     <Phone className="h-4 w-4" />
//                     {user.phoneNumber}
//                   </span>
//                 )}
//                 {user.address && (
//                   <span className="flex items-center gap-1">
//                     <MapPin className="h-4 w-4" />
//                     {user.address}
//                   </span>
//                 )}
//                 <span className="flex items-center gap-1">
//                   <Calendar className="h-4 w-4" />
//                   عضو منذ {formatDate(user.createdAt)}
//                 </span>
//               </div>
//             </div>

//             {/* Edit Button */}
//             <Button  variant="outline" className="group shadow-sm">
//               <Link
//                 href="/account/settings"
//                 className="flex items-center gap-2"
//               >
//                 <Settings className="h-4 w-4 transition-transform group-hover:rotate-90" />
//                 تعديل الملف الشخصي
//               </Link>
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions Grid */}
//       <div>
//         <div className="mb-4 flex items-center gap-2">
//           <h2 className="text-xl font-semibold">الوصول السريع</h2>
//           <div className="bg-primary/20 h-px flex-1" />
//         </div>

//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {QUICK_LINKS.map((link) => (
//             <Link key={link.href} href={link.href} className="group">
//               <Card className="relative h-full overflow-hidden border-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
//                 {/* linear Overlay on Hover */}
//                 <div
//                   className={`absolute inset-0 bg-linear-to-br ${link.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
//                 />

//                 <CardHeader className="pb-3">
//                   <div className="flex items-center justify-between">
//                     <div className={`rounded-xl p-3 ${link.bgColor}`}>
//                       <link.icon className={`h-6 w-6 ${link.iconColor}`} />
//                     </div>
//                     <ArrowLeft className="text-muted-foreground h-5 w-5 transition-transform group-hover:-translate-x-1" />
//                   </div>
//                 </CardHeader>

//                 <CardContent>
//                   <CardTitle className="mb-1 text-lg">{link.label}</CardTitle>
//                   <CardDescription>{link.description}</CardDescription>
//                 </CardContent>
//               </Card>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Recent Activity / CTA Section */}
//       <Card className="from-primary/5 to-secondary/5 overflow-hidden border-0 bg-linear-to-br shadow-lg">
//         <CardContent className="flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:text-right">
//           <div className="bg-primary/10 rounded-full p-4">
//             <ShoppingBag className="text-primary h-8 w-8" />
//           </div>
//           <div className="flex-1">
//             <h3 className="mb-1 text-lg font-semibold">استكشف أحدث العطور</h3>
//             <p className="text-muted-foreground text-sm">
//               تصفح مجموعتنا الجديدة من العطور الفاخرة واستمتع بعروض حصرية
//             </p>
//           </div>
//           <Button  className="group shadow-md">
//             <Link href="/products" className="flex items-center gap-2">
//               تسوق الآن
//               <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
//             </Link>
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default AccountPage;
