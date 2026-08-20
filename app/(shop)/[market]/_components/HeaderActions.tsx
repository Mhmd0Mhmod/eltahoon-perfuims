"use client";

import { Roles } from "@/enums/roles";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCartStore } from "@/stores/useCartStore";
import {
  LayoutDashboard,
  Search,
  ShoppingBag,
  User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function HeaderActions() {
  const { userProfile, isLoading } = useAuth();
  const isAdmin = userProfile?.role === Roles.ADMIN;
  const items = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const actionClass =
    "flex size-9 shrink-0 items-center justify-center rounded-none border border-transparent transition-colors hover:border-foreground/20 hover:bg-card/70 sm:size-10";

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {/* Search */}
      <button
        type="button"
        className={actionClass}
        aria-label="البحث"
      >
        <Search className="size-4 sm:size-4.5" />
      </button>

      {!isLoading && (
        <>
          {userProfile ? (
            <>
              {/* Account */}
              <Link
                href="/account"
                className={actionClass}
                aria-label="الحساب"
              >
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

      {/* Cart */}
      <Link
        href="/cart"
        className={`${actionClass} relative`}
        aria-label="سلة التسوق"
      >
        <ShoppingBag className="size-4 sm:size-4.5" />

        {mounted && totalItems > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-none bg-primary text-[9px] text-primary-foreground sm:text-[10px]">
            {totalItems > 99 ? "+99" : totalItems}
          </span>
        )}
      </Link>
    </div>
  );
}

export default HeaderActions;
