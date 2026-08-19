import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, LucideIcon, Package, ShoppingCart } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
}

function StatCard({ title, value, description, icon: Icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>

        <Icon className="text-muted-foreground h-4 w-4" />
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold">{value}</div>

        <p className="text-muted-foreground text-xs">{description}</p>
      </CardContent>
    </Card>
  );
}

interface CustomerStatsProps {
  totalOrders: number;
  completedOrders: number;
  totalSpent: string;
}

export function CustomerStats({
  totalOrders,
  completedOrders,
  totalSpent,
}: CustomerStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="إجمالي الطلبات"
        value={totalOrders}
        description="جميع الطلبات المقدمة"
        icon={ShoppingCart}
      />

      <StatCard
        title="الطلبات المكتملة"
        value={completedOrders}
        description="طلبات تم تسليمها"
        icon={Package}
      />

      <StatCard
        title="إجمالي الإنفاق"
        value={totalSpent}
        description="القيمة الإجمالية للمشتريات"
        icon={CreditCard}
      />
    </div>
  );
}
