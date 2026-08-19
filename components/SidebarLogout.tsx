"use client";

import { LogOut } from "lucide-react";

import { logoutAction } from "@/app/(auth)/actions";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

function SidebarLogout() {
  return (
    <form action={logoutAction}>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            type="submit"
            tooltip="تسجيل الخروج"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut />
            <span>تسجيل الخروج</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </form>
  );
}

export default SidebarLogout;
