// import { getUser } from "@/app/(auth)/actions";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { cn } from "@/lib/utils";
// import { Package, Settings, User } from "lucide-react";
// import Link from "next/link";
// import { redirect } from "next/navigation";

// const ACCOUNT_NAV_ITEMS = [
//   {
//     href: "/account",
//     label: "الملف الشخصي",
//     icon: User,
//   },
//   {
//     href: "/account/orders",
//     label: "طلباتي",
//     icon: Package,
//   },
//   {
//     href: "/account/settings",
//     label: "الإعدادات",
//     icon: Settings,
//   },
// ];

// async function AccountLayout({ children }: { children: React.ReactNode }) {
//   const user = await getUser();

//   if (!user) {
//     redirect("/login");
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
//         {/* Sidebar Navigation */}
//         <aside className="hidden lg:block">
//           <Card className="sticky top-24">
//             <CardContent className="p-4">
//               {/* User Info */}
//               <div className="mb-4 text-center">
//                 <div className="bg-primary/10 mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full">
//                   <User className="text-primary h-8 w-8" />
//                 </div>
//                 <h3 className="font-semibold">
//                   {user.fullName || user.username}
//                 </h3>
//                 <p className="text-muted-foreground text-sm">{user.email}</p>
//               </div>

//               <Separator className="my-4" />

//               {/* Navigation Links */}
//               <nav className="space-y-1">
//                 {ACCOUNT_NAV_ITEMS.map((item) => (
//                   <AccountNavLink key={item.href} item={item} />
//                 ))}
//               </nav>
//             </CardContent>
//           </Card>
//         </aside>

//         {/* Mobile Navigation */}
//         <div className="lg:hidden">
//           <Card className="mb-6">
//             <CardContent className="flex gap-2 overflow-x-auto p-2">
//               {ACCOUNT_NAV_ITEMS.map((item) => (
//                 <Button
//                   key={item.href}
//                   variant="ghost"
//                   size="sm"
//
//                   className="shrink-0"
//                 >
//                   <Link href={item.href} className="flex items-center gap-2">
//                     <item.icon className="h-4 w-4" />
//                     {item.label}
//                   </Link>
//                 </Button>
//               ))}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Main Content */}
//         <div className="min-w-0">{children}</div>
//       </div>
//     </div>
//   );
// }

// function AccountNavLink({
//   item,
// }: {
//   item: {
//     href: string;
//     label: string;
//     icon: React.ComponentType<{ className?: string }>;
//   };
// }) {
//   return (
//     <Button
//       variant="ghost"
//
//       className={cn("w-full justify-start gap-3 text-right")}
//     >
//       <Link href={item.href}>
//         <item.icon className="h-5 w-5" />
//         {item.label}
//       </Link>
//     </Button>
//   );
// }

// export default AccountLayout;
