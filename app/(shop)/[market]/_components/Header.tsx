import Logo from "@/components/Logo";
import MarketLink from "@/components/MarketLink";
import CategoriesSheet from "./CategoriesSheet";
import HeaderActions from "./HeaderActions";
import MobileNav from "./MobileNav";

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/88 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between sm:h-22">
          <div className="flex items-center gap-1">
            <MobileNav />
            <nav className="hidden items-center gap-8 lg:flex">
              <CategoriesSheet />

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
          </div>

          <Logo />
          <HeaderActions />
        </div>
      </div>
    </header>
  );
}

export default Header;
