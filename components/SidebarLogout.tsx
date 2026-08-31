"use client";

import { LogOut } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function SidebarLogout() {
  const { logout } = useAuth();
  const router = useRouter();
  function handleLogout() {
    logout(undefined, {
      onSuccess: () => {
        toast.success("تم تسجيل الخروج بنجاح");
        router.push("/");
      },
    });
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={handleLogout}
          tooltip="تسجيل الخروج"
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut />
          <span>تسجيل الخروج</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default SidebarLogout;
