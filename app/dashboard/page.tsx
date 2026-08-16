// import { DashboardStats } from "@/components/admin/dashboard-stats";
// import { OverviewChart } from "@/components/admin/overview-chart";
// import { RecentOrdersTable } from "@/components/admin/recent-orders-table";
// import { RecentSales } from "@/components/admin/recent-sales";
// import { YearSelector } from "@/components/shared/year-selector";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { CountryAPI } from "@/lib/api/country";
// import { DashboardAPI } from "@/lib/api/dashboard";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "لوحة التحكم",
//   description: "لوحة تحكم مؤسسه طاحون - المسك للعطور",
// };

// export default async function DashboardPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ year?: string }>;
// }) {
//   const { year } = await searchParams;
//   const [dashboardStats, currentCountry] = await Promise.all([
//     DashboardAPI.getDashboardStats(year || new Date().getFullYear().toString()),
//     CountryAPI.getCurrentCountryServer(),
//   ]);
//   return (
//     <div className="flex-1 space-y-4 p-8 pt-6">
//       <div className="flex items-center justify-between space-y-2">
//         <h2 className="text-3xl font-bold tracking-tight">لوحة التحكم</h2>
//         <YearSelector />
//       </div>

//       {/* Summary Stats */}
//       <DashboardStats stats={dashboardStats} currentCountry={currentCountry!.code} />

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//         {/* Overview Chart */}
//         <Card className="col-span-4">
//           <CardHeader>
//             <CardTitle>نظرة عامة</CardTitle>
//           </CardHeader>
//           <CardContent className="pl-2">
//             <OverviewChart data={dashboardStats.monthlyStats} />
//           </CardContent>
//         </Card>

//         {/* Recent Sales */}
//         <Card className="col-span-3">
//           <CardHeader>
//             <CardTitle>المبيعات الأخيرة</CardTitle>
//             <CardDescription>أحدث {dashboardStats.recentPayments.length} عملية دفع</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <RecentSales
//               payments={dashboardStats.recentPayments}
//               countryCode={currentCountry!.code}
//             />
//           </CardContent>
//         </Card>
//       </div>

//       {/* Recent Orders */}
//       <Card className="col-span-4">
//         <CardHeader>
//           <CardTitle>الطلبات الأخيرة</CardTitle>
//           <CardDescription>قائمة بآخر {dashboardStats.recentOrders.length} طلبات.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <RecentOrdersTable orders={dashboardStats.recentOrders} />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
function page() {
  return <div>page</div>;
}
export default page;
