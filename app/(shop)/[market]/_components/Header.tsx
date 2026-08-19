import Logo from "@/components/Logo";
import MarketLink from "@/components/MarketLink";
import HeaderActions from "./HeaderActions";

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
          <HeaderActions />
        </div>
      </div>
    </header>
  );
}

export default Header;
