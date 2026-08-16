import Logo from "@/components/Logo";
import MarketLink from "@/components/MarketLink";
import { Search, ShoppingBag, User } from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/88 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-22 items-center justify-between">
          <nav className="hidden items-center gap-8 lg:flex">
            <MarketLink
              href="/products"
              className="text-[13px] tracking-[0.14em] transition-opacity hover:opacity-60"
            >
              المتجر
            </MarketLink>

            <MarketLink
              href="/contact"
              className="text-[13px] tracking-[0.14em] transition-opacity hover:opacity-60"
            >
              تواصل معنا
            </MarketLink>

            <MarketLink
              href="/about"
              className="text-[13px] tracking-[0.14em] transition-opacity hover:opacity-60"
            >
              قصتنا
            </MarketLink>
          </nav>

          <Logo />

          <div className="flex items-center gap-2">
            <button className="flex size-10 items-center justify-center rounded-none border border-transparent transition-colors hover:border-foreground/20 hover:bg-card/70">
              <Search className="size-4.5" />
            </button>

            <button className="hidden size-10 items-center justify-center rounded-none border border-transparent transition-colors hover:border-foreground/20 hover:bg-card/70 sm:flex">
              <User className="size-4.5" />
            </button>

            <button className="relative flex size-10 items-center justify-center rounded-none border border-transparent transition-colors hover:border-foreground/20 hover:bg-card/70">
              <ShoppingBag className="size-4.5" />

              <span className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-none bg-primary text-[10px] text-primary-foreground">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
