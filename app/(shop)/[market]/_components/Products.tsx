import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";
import CardSkeleton from "./CardSkeleton";
import { getProducts } from "../actions";
import { IProduct } from "@/features/products/types";
import FormatCurrency from "@/components/FormatCurrency";
import MarketLink from "@/components/MarketLink";

function Products() {
  return (
    <section className="py-18 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-y border-foreground/15 py-8">
          <div>
            <p className="mb-3 text-[11px] tracking-[0.35em] text-muted-foreground uppercase">
              Signature Selection
            </p>

            <h2 className="text-3xl leading-tight font-semibold md:text-5xl">
              تحرير الروائح
              <span className="block text-primary">الأكثر تميزًا</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
              مجموعة محدودة بصياغة عربية معاصرة، صممت لمن يبحث عن حضور هادئ
              ومترف في كل إطلالة.
            </p>
          </div>

          <Link
            href="/products"
            className="hidden items-center gap-2 border-b border-foreground/70 pb-1 text-sm tracking-widest uppercase md:flex"
          >
            تصفح المتجر الكامل
            <ArrowLeft className="size-4" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Suspense
            fallback={Array.from({ length: 4 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          >
            <ProductsCards />
          </Suspense>
        </div>

        <Link
          href="/products"
          className="mx-auto mt-10 flex w-fit items-center gap-2 border-b border-foreground/70 pb-1 text-sm tracking-[0.08em] uppercase md:hidden"
        >
          تصفح المتجر الكامل
          <ArrowLeft className="size-4" />
        </Link>
      </div>
    </section>
  );
}

async function ProductsCards() {
  const products = await getProducts();
  return products.content.map((product) => (
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
export default Products;
