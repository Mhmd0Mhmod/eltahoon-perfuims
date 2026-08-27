"use client";
import CardSkeleton from "@/components/CardSkeleton";
import FormatCurrency from "@/components/FormatCurrency";
import MarketLink from "@/components/MarketLink";
import { getProducts } from "@/features/products/services";
import { IProduct } from "@/features/products/types";
import { useInfiniteQuery } from "@/hooks/useMarketQuery";

function ProductsCards() {
  const { data, isLoading } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: async ({ pageParam = 1 }) =>
      getProducts({
        page: pageParam,
        params: {
          size: 4,
        },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.last) return lastPage.data.page + 1;
    },
  });
  const products = data?.pages.flatMap((page) => page.data.content) || [];
  if (isLoading) {
    return Array.from({ length: 4 }).map((_, index) => (
      <CardSkeleton key={index} />
    ));
  }
  return products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
}
function ProductCard({ product }: { product: IProduct }) {
  const minPrice = Math.min(
    ...product.variants.map((variant) => variant.newPrice),
  );
  const maxPrice = Math.max(
    ...product.variants.map((variant) => variant.newPrice),
  );
  return (
    <MarketLink
      key={product.id}
      href={`/products/${product.id}`}
      className="editorial-shell group relative overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1"
    >
      <article>
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-l from-transparent via-primary/65 to-transparent" />
        <p className="text-[11px] tracking-[0.28em] text-muted-foreground uppercase">
          Exclusive
        </p>
        <h3 className="mt-4 text-xl leading-snug font-medium">
          {product.name}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground max-h-20 overflow-hidden text-ellipsis ">
          {product.description}
        </p>
        <div className="flex flex-row gap-1 mt-4 items-center">
          <p className=" text-lg font-semibold text-primary">
            <FormatCurrency value={minPrice} />
          </p>
          {minPrice !== maxPrice && (
            <p className=" text-sm text-muted-foreground">
              - <FormatCurrency value={maxPrice} />
            </p>
          )}
        </div>
      </article>
    </MarketLink>
  );
}
export default ProductsCards;
