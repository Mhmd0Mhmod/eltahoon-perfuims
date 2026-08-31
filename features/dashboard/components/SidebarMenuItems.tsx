"use client";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import {
  BadgePercent,
  CreditCard,
  FolderTree,
  LayoutDashboard,
  Package,
  Ruler,
  Settings,
  ShoppingCart,
  Ticket,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
  {
    title: "لوحة التحكم",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "المنتجات",
    url: "/dashboard/products",
    icon: Package,
  },
  {
    title: "التصنيفات",
    url: "/dashboard/categories",
    icon: FolderTree,
  },
  {
    title: "أحجام",
    url: "/dashboard/sizes",
    icon: Ruler,
  },
  {
    title: "العروض",
    url: "/dashboard/offers",
    icon: BadgePercent,
  },
  {
    title: "كوبونات",
    url: "/dashboard/coupons",
    icon: Ticket,
  },
  {
    title: "الطلبات",
    url: "/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "المدفوعات",
    url: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    title: "العملاء",
    url: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "الإعدادات",
    url: "/dashboard/settings",
    icon: Settings,
  },
];
function SidebarMenuItems() {
  return menuItems.map((item) => (
    <SidebarActiveMenuItem key={item.url} item={item} />
  ));
}
function SidebarActiveMenuItem({ item }: { item: (typeof menuItems)[number] }) {
  const router = useRouter();
  const pathName = usePathname();
  const isACtive = pathName === item.url;
  function handleClick() {
    router.push(item.url);
  }
  return (
    <SidebarMenuItem>
      <Link href={item.url} className="flex items-center gap-3 w-full">
        <SidebarMenuButton
          onClick={handleClick}
          tooltip={item.title}
          className="flex items-center gap-3 cursor-pointer"
          isActive={isACtive}
        >
          <item.icon className="h-5 w-5" />
          <span>{item.title}</span>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
}
export default SidebarMenuItems;
