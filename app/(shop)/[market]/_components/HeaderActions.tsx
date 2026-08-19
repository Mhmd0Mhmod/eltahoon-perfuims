"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";

function HeaderActions() {
  const { userProfile, isLoading } = useAuth();
  return (
    <div className="flex items-center gap-2">
      <button
        className="flex size-10 items-center justify-center rounded-none border border-transparent transition-colors hover:border-foreground/20 hover:bg-card/70"
        aria-label="البحث"
      >
        <Search className="size-4.5" />
      </button>

      {!isLoading && (
        <>
          {userProfile ? (
            <Link
              href="/account"
              className="hidden size-10 items-center justify-center rounded-none border border-transparent transition-colors hover:border-foreground/20 hover:bg-card/70 sm:flex"
              aria-label="الحساب"
            >
              <User className="size-4.5" />
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden size-10 items-center justify-center rounded-none border border-transparent transition-colors hover:border-foreground/20 hover:bg-card/70 sm:flex"
              aria-label="تسجيل الدخول"
            >
              <User className="size-4.5" />
            </Link>
          )}
        </>
      )}

      <Link
        href="/cart"
        className="relative flex size-10 items-center justify-center rounded-none border border-transparent transition-colors hover:border-foreground/20 hover:bg-card/70"
        aria-label="سلة التسوق"
      >
        <ShoppingBag className="size-4.5" />

        <span className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-none bg-primary text-[10px] text-primary-foreground">
          0
        </span>
      </Link>
    </div>
  );
}

export default HeaderActions;
