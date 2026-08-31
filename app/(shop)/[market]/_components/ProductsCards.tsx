"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/features/products/components/ProductCard";
import { getProducts } from "@/features/products/services";
import { useInfiniteQuery } from "@/hooks/useMarketQuery";

function ProductCardSkeleton() {
  return (
    <Card className="p-0">
      <Skeleton className="aspect-square w-full" />
      <CardContent className="space-y-3 p-4 text-right sm:p-5">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
  );
}

function ProductsCards() {
  const { data, isLoading } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: async ({ pageParam = 1 }) =>
      getProducts({
        page: pageParam,
        params: {
          size: 8,
        },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.last) return lastPage.data.page + 1;
    },
  });
  const products = data?.pages.flatMap((page) => page.data.content) || [];
  if (isLoading) {
    return Array.from({ length: 8 }).map((_, index) => (
      <ProductCardSkeleton key={index} />
    ));
  }
  return products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
}
export default ProductsCards;
