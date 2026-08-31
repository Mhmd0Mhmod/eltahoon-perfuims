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
import IconImage from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import SidebarMenuItems from "./SidebarMenuItems";

function DashboardSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset" side="right">
      <SidebarHeader className="border-b p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Link href="/" className="flex w-full items-center gap-2">
                <div className="relative h-12 w-12 shrink-0 sm:h-14 sm:w-14">
                  <Image
                    src={IconImage}
                    alt="مؤسسه طاحون - المسك للعطور"
                    width={56}
                    height={56}
                    priority
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="text-right">
                  <h2 className="text-primary font-bold">مؤسسه طاحون</h2>
                  <p className="text-muted-foreground text-xs">المسك للعطور</p>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-right">
            القائمة الرئيسية
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItems />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        {/* <UserMenuTrigger /> */}
      </SidebarFooter>
    </Sidebar>
  );
}

export default DashboardSidebar;
