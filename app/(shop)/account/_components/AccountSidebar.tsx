"use client";

import SidebarLogout from "@/components/SidebarLogout";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Package, Settings, User } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
    href: "/account/settings",
    label: "الإعدادات",
    icon: Settings,
  },
];

interface AccountSidebarProps {
  user: {
    fullName?: string | null;
    username: string;
    email: string;
  };
}
function AccountSidebar({ user }: AccountSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar side="right" variant="floating">
      {/* User */}
      <SidebarHeader>
        <div className="flex flex-col items-center gap-3 px-2 py-4 text-center">
          <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
            <User className="text-primary h-8 w-8" />
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold">
              {user.fullName || user.username}
            </h3>

            <p className="text-muted-foreground truncate text-sm">
              {user.email}
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>الحساب</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {ACCOUNT_NAV_ITEMS.map((item) => {
                const Icon = item.icon;

                const isActive =
                  item.href === "/account"
                    ? pathname === "/account"
                    : pathname.startsWith(item.href);

                return (
                  <SidebarMenuItem key={item.href}>
                    <Link href={item.href}>
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={item.label}
                      >
                        <Icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Logout */}
      <SidebarFooter>
        <SidebarLogout />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AccountSidebar;
