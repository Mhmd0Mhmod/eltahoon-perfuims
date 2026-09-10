import MarketLink from "@/components/MarketLink";
import { MarketKey } from "@/config/markets";
import { ICategory } from "@/features/category/types";
import { api } from "@/lib/springAPI";
import { Droplets, Flower2, Leaf, Wind } from "lucide-react";

const categoryIcons = [Droplets, Flower2, Leaf, Wind];

async function CategoriesCards({ market }: { market: MarketKey }) {
  let categories: ICategory[] = [];
  try {
    const respone = await api.get<ICategory[]>("/categories", {
      headers: {
        "Cookie" : `country_code=${market}`,
      }
    });
    categories = respone.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
  return categories.map((category, index) => {
    const Icon = categoryIcons[index % categoryIcons.length];
    return (
      <MarketLink
        key={category.id}
        href={`/products?categories=${category.id}`}
        className="editorial-shell group relative overflow-hidden p-6 text-right transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <article>
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-l from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="mb-5 flex items-center justify-between">
            <span className="text-primary/75 text-[11px] tracking-[0.32em] uppercase">
              0{index + 1}
            </span>
            <div className="flex h-10 w-10 items-center justify-center border border-primary/25 bg-primary/5 transition-all duration-300 group-hover:bg-primary/12 group-hover:border-primary/40">
              <Icon className="text-primary h-4.5 w-4.5" />
            </div>
          </div>

          <h3 className="text-xl font-medium transition-colors duration-200 group-hover:text-primary">
            {category.name}
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {category.description}
          </p>

          <div className="mt-5 flex items-center gap-1.5 text-xs tracking-widest text-primary/70 uppercase opacity-0 transition-all duration-300 group-hover:opacity-100">
            <span>تسوق الآن</span>
            <span className="transition-transform duration-200 group-hover:-translate-x-1">
              ←
            </span>
          </div>
        </article>
      </MarketLink>
    );
  });
}
export default CategoriesCards;
