import { Package, Settings, ShoppingBag } from "lucide-react";

export const QUICK_LINKS = [
  {
    href: "/account/orders",
    label: "طلباتي",
    description: "تتبع جميع طلباتك وحالتها",
    icon: Package,
    bgColor: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    href: "/account/cart",
    label: "سلة الشراء",
    description: "راجع المنتجات التي أضفتها إلى سلتك",
    icon: ShoppingBag,
    bgColor: "bg-rose-500/10",
    iconColor: "text-rose-500",
  },
  {
    href: "/account/settings",
    label: "الإعدادات",
    description: "تخصيص حسابك وتفضيلاتك",
    icon: Settings,
    bgColor: "bg-violet-500/10",
    iconColor: "text-violet-500",
  },
] as const;
