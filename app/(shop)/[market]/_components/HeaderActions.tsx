"use client";

import SelectCountry from "@/components/SelectCountry";
import { Roles } from "@/enums/roles";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { CartDrawer } from "@/features/cart";
import { LayoutDashboard, User } from "lucide-react";
import Link from "next/link";

function HeaderActions() {
  const { userProfile, isLoading } = useAuth();
  const isAdmin = userProfile?.role === Roles.ADMIN;
  const actionClass =
    "flex size-9 shrink-0 items-center justify-center rounded-none border border-transparent transition-colors hover:border-foreground/20 hover:bg-card/70 sm:size-10";

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <SelectCountry size="sm" />
      {!isLoading && (
        <>
          {userProfile ? (
            <>
              {/* Account */}
              <Link href="/account" className={actionClass} aria-label="الحساب">
                <User className="size-4 sm:size-4.5" />
              </Link>

              {/* Dashboard */}
              {isAdmin && (
                <Link
                  href="/dashboard"
                  className={actionClass}
                  aria-label="لوحة التحكم"
                >
                  <LayoutDashboard className="size-4 sm:size-4.5" />
                </Link>
              )}
            </>
          ) : (
            /* Login */
            <Link
              href="/login"
              className={actionClass}
              aria-label="تسجيل الدخول"
            >
              <User className="size-4 sm:size-4.5" />
            </Link>
          )}
        </>
      )}

      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  );
}

export default HeaderActions;
