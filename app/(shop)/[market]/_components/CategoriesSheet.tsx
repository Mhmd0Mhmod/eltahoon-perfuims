"use client";
import MarketLink from "@/components/MarketLink";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getCategories } from "@/features/category/services";
import { useQuery } from "@/hooks/useMarketQuery";
import { LayoutGrid, ChevronLeft } from "lucide-react";

function CategoriesSheet() {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (data) => data.data,
  });

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant={"ghost"}>
            <LayoutGrid className="size-4" />
          </Button>
        }
      />
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>تصنيفات العطور</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-11 w-full animate-pulse bg-muted/60"
                />
              ))}
            </div>
          ) : categories.length > 0 ? (
            <ul className="space-y-1">
              {categories.map((category) => (
                <li key={category.id}>
                  <MarketLink
                    href={`/products?categories=${category.id}`}
                    className="group flex items-center justify-between border-b border-foreground/8 px-2 py-3 text-right transition-colors hover:bg-primary/5"
                  >
                    <span className="text-sm font-medium group-hover:text-primary">
                      {category.name}
                    </span>
                    <ChevronLeft className="text-muted-foreground size-4" />
                  </MarketLink>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-sm">
              لا توجد تصنيفات متاحة
            </p>
          )}
        </div>

        <div className="border-t px-4 py-4">
          <Button variant="outline" className="w-full">
            <MarketLink href="/products">تصفح جميع المنتجات</MarketLink>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CategoriesSheet;
