"use client";
import MarketLink from "@/components/MarketLink";
import { getCategories } from "@/features/category/services";
import { useQuery } from "@/hooks/useMarketQuery";
import CardSkeleton from "./CardSkeleton";

function CategoriesCards() {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories, 
    select: (data) => data.data,
  });
  if (isLoading) {
    return Array.from({ length: 4 }).map((_, index) => (
      <CardSkeleton key={index} />
    ));
  }
  return categories.map((category, index) => (
    <MarketLink
      key={category.id}
      href={`/products?categories=${category.id}`}
      className="editorial-shell relative p-6 text-right"
    >
      <article>
        <span className="text-primary/75 text-[11px] tracking-[0.32em] uppercase">
          0{index + 1}
        </span>
        <h3 className="mt-4 text-xl font-medium">{category.name}</h3>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          {category.description}
        </p>
      </article>
    </MarketLink>
  ));
}
export default CategoriesCards;
