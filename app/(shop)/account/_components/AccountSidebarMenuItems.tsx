"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

import { Package, Settings, User, Wallet } from "lucide-react";

import { usePathname, useRouter } from "next/navigation";
const ACCOUNT_NAV_ITEMS = [
  {
    href: "/account",
    label: "الملف الشخصي",
    icon: User,
  },
  {
    href: "/account/orders",
    label: "طلباتي",
    icon: Package,
  },
  {
    href: "/account/payments",
    label: "دفعاتي",
    icon: Wallet,
  },
  {
    href: "/account/settings",
    label: "الإعدادات",
    icon: Settings,
  },
];
function AccountSidebarMenuItems() {
  return ACCOUNT_NAV_ITEMS.map((item) => (
    <SidebareActiveMenuButton key={item.href} item={item} />
  ));
}
function SidebareActiveMenuButton({
  item,
}: {
  item: (typeof ACCOUNT_NAV_ITEMS)[number];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const Icon = item.icon;
  const isActive = pathname === item.href;
  function handleClick() {
    router.push(item.href);
  }
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        tooltip={item.label}
        onClick={handleClick}
      >
        <Icon />
        <span>{item.label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
export default AccountSidebarMenuItems;
