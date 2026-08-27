import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ProductsCards from "./ProductsCards";

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
          <ProductsCards />
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

export default Products;
