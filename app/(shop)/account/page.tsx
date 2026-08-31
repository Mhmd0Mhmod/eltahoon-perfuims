import { getCurrentUser } from "@/app/actions";
import { redirect } from "next/navigation";

import AccountProfileHero from "@/features/account/components/AccountProfileHero";
import QuickLinks from "@/features/account/components/QuickLinks";
import AccountPromoCard from "@/features/account/components/AccountPromoCard";

async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="space-y-8">
      <AccountProfileHero user={user} />

      <QuickLinks />

      <AccountPromoCard />
    </div>
  );
}

export default AccountPage;
