import { getCurrentUser } from "@/app/actions";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import AccountSidebar from "./_components/AccountSidebar";
export const dynamic = "force-dynamic";
async function AccountLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <SidebarProvider>
      <AccountSidebar user={user} />
      <SidebarInset>
        <header className="flex h-14 items-center border-b border-foreground/10 px-4 md:hidden">
          <SidebarTrigger />
          <span className="ms-2 text-sm font-semibold">حسابي</span>
        </header>
        <main className="container mx-auto px-4 py-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AccountLayout;
