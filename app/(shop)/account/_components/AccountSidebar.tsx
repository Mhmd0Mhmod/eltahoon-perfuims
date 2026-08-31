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
} from "@/components/ui/sidebar";

import { User } from "lucide-react";

import AccountSidebarMenuItems from "./AccountSidebarMenuItems";

interface AccountSidebarProps {
  user: {
    fullName?: string | null;
    username: string;
    email: string;
  };
}
function AccountSidebar({ user }: AccountSidebarProps) {
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
              <AccountSidebarMenuItems />
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
