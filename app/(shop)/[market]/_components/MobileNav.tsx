"use client";
import MarketLink from "@/components/MarketLink";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getCategories } from "@/features/category/services";
import { useQuery } from "@/hooks/useMarketQuery";
import { ChevronLeft, LayoutGrid, Menu, Store, Phone, BookOpen } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/products", label: "المتجر", icon: Store },
  { href: "/contact", label: "تواصل معنا", icon: Phone },
  { href: "/about", label: "قصتنا", icon: BookOpen },
];

function MobileNav() {
  const [open, setOpen] = useState(false);
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (data) => data.data,
    enabled: open,
  });

  const handleNavigate = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <button
            className="flex size-9 shrink-0 items-center justify-center rounded-none border border-transparent transition-colors hover:border-foreground/20 hover:bg-card/70 lg:hidden"
            aria-label="القائمة"
          >
            <Menu className="size-5" />
          </button>
        }
      />
      <SheetContent side="right" className="overflow-y-auto">
        <SheetHeader className="text-right">
          <SheetTitle>القائمة</SheetTitle>
          <SheetDescription>تصفح المتجر والتصنيفات</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-1 px-4 pb-4">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <MarketLink
                key={link.href}
                href={link.href}
                onClick={handleNavigate}
                className="flex items-center gap-3 border-b border-foreground/8 px-2 py-3 text-right text-sm font-medium transition-colors hover:bg-primary/5 hover:text-primary"
              >
                <Icon className="text-muted-foreground size-4" />
                {link.label}
              </MarketLink>
            );
          })}
        </div>

        <div className="px-4 pb-4">
          <p className="mb-2 flex items-center gap-2 px-2 text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            <LayoutGrid className="size-3.5" />
            التصنيفات
          </p>

          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-10 w-full animate-pulse bg-muted/60"
                />
              ))}
            </div>
          ) : categories.length > 0 ? (
            <ul className="space-y-1">
              {categories.map((category) => (
                <li key={category.id}>
                  <MarketLink
                    href={`/products?categories=${category.id}`}
                    onClick={handleNavigate}
                    className="group flex items-center justify-between border-b border-foreground/8 px-2 py-3 text-right transition-colors hover:bg-primary/5"
                  >
                    <span className="text-sm group-hover:text-primary">
                      {category.name}
                    </span>
                    <ChevronLeft className="text-muted-foreground size-4" />
                  </MarketLink>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-2 text-sm text-muted-foreground">
              لا توجد تصنيفات متاحة
            </p>
          )}

          <Button variant="outline" className="mt-4 w-full">
            <MarketLink href="/products" onClick={handleNavigate}>
              تصفح جميع المنتجات
            </MarketLink>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
