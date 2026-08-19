import ActiveLink from "@/components/ActiveLink";
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
import Image from "next/image";
import Link from "next/link";
import IconImage from "@/public/logo.png";

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
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <ActiveLink
                    href={item.url}
                    className="flex items-center gap-3 w-full"
                  >
                    <SidebarMenuButton
                      tooltip={item.title}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </ActiveLink>
                </SidebarMenuItem>
              ))}
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
