import { getCurrentUser } from "@/app/actions";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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
        <main className="container mx-auto px-4 py-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AccountLayout;
