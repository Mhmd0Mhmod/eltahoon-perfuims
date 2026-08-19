import SelectCountry from "@/components/SelectCountry";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import DashboardSidebar from "@/features/dashboard/components/Sidebar";
export const dynamic = "force-dynamic";
function layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <header className="flex items-center justify-between p-5">
          <SidebarTrigger />
          <SelectCountry />
        </header>
        <main className="flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
export default layout;
