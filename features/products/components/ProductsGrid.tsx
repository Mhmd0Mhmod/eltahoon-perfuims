"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProductsFilter } from "@/stores/useProductsFilter";
import { ArrowUpDown, PackageOpen, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { useInfiniteQuery } from "@/hooks/useMarketQuery";
import { getProducts } from "../services";

type SortOption = "featured" | "price-asc" | "price-desc" | "newest";

export function ProductsGrid() {
  const { filters, resetFilters } = useProductsFilter();
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const params = useMemo(
    () => ({
      q: filters.searchTerm.trim() || undefined,
      categoryIds:
        filters.categories.length > 0 ? filters.categories : undefined,
      offerIds: filters.offers.length > 0 ? filters.offers : undefined,
    }),
    [filters],
  );

  const {
    data,
    isPending,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", params],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      getProducts({
        params,
        page: pageParam,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.last) {
        return undefined;
      }
      return lastPage.data.page + 1;
    },
  });

  const products = useMemo(
    () => data?.pages.flatMap((page) => page.data.content ?? []) ?? [],
    [data],
  );

  const sortedProducts = useMemo(() => {
    const list = [...products];
    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => {
          const aPrices =
            a.variants
              ?.map((variant) => Number(variant.newPrice))
              .filter(Number.isFinite) ?? [];
          const bPrices =
            b.variants
              ?.map((variant) => Number(variant.newPrice))
              .filter(Number.isFinite) ?? [];
          const aMin = aPrices.length ? Math.min(...aPrices) : Infinity;
          const bMin = bPrices.length ? Math.min(...bPrices) : Infinity;
          return aMin - bMin;
        });
      case "price-desc":
        return list.sort((a, b) => {
          const aPrices =
            a.variants
              ?.map((variant) => Number(variant.newPrice))
              .filter(Number.isFinite) ?? [];
          const bPrices =
            b.variants
              ?.map((variant) => Number(variant.newPrice))
              .filter(Number.isFinite) ?? [];
          const aMax = aPrices.length ? Math.max(...aPrices) : -Infinity;
          const bMax = bPrices.length ? Math.max(...bPrices) : -Infinity;
          return bMax - aMax;
        });
      case "newest":
        return list.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
      case "featured":
      default:
        return list;
    }
  }, [products, sortBy]);

  if (isPending) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <p className="text-muted-foreground text-sm">جاري تحميل المنتجات...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-75 flex-col items-center justify-center gap-4 text-center">
        <PackageOpen className="text-muted-foreground h-10 w-10" />

        <div>
          <h3 className="text-lg font-bold">حدث خطأ أثناء تحميل المنتجات</h3>

          <p className="text-muted-foreground text-sm">
            {error instanceof Error ? error.message : "يرجى المحاولة مرة أخرى."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="bg-card/50 flex flex-wrap items-center justify-between gap-4 rounded-xl border p-4 shadow-2xs">
        <div className="flex items-center gap-2">
          <Sparkles className="text-primary h-4 w-4" />

          <span className="text-sm font-medium">
            عرض{" "}
            <strong className="text-primary">{sortedProducts.length}</strong> من{" "}
            {products.length} منتج
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="text-muted-foreground h-4 w-4" />

            <span className="text-muted-foreground text-xs font-medium">
              ترتيب حسب:
            </span>
          </div>

          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as SortOption)}
          >
            <SelectTrigger className="w-40 text-xs">
              <SelectValue placeholder="الترتيب" />
            </SelectTrigger>

            <SelectContent align="end">
              <SelectItem value="featured">المميزة</SelectItem>
              <SelectItem value="newest">الأحدث وصولاً</SelectItem>
              <SelectItem value="price-asc">السعر: من الأقل للأعلى</SelectItem>
              <SelectItem value="price-desc">السعر: من الأعلى للأقل</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products */}
      {sortedProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {hasNextPage && (
            <div className="flex justify-center">
              <Button
                variant="outline"
                disabled={isFetchingNextPage}
                onClick={() => fetchNextPage()}
              >
                {isFetchingNextPage ? "جاري التحميل..." : "تحميل المزيد"}
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-16 text-center">
          <div className="bg-muted mb-4 rounded-full p-4">
            <PackageOpen className="text-muted-foreground h-8 w-8" />
          </div>

          <h3 className="mb-2 text-lg font-bold">لا توجد منتجات مطابقة</h3>

          <p className="text-muted-foreground mb-6 max-w-sm text-sm">
            لم نتمكن من العثور على أي منتج يطابق معايير البحث الحالية الخاصة بك.
          </p>

          <Button variant="outline" onClick={resetFilters}>
            إعادة تعيين الفلاتر
          </Button>
        </div>
      )}
    </div>
  );
}
