import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function Products() {
  const highlights = [
    {
      name: "عود المسك الملكي",
      note: "دافئ - خشبي - مخملي",
      price: "420 ر.س",
    },
    {
      name: "ورد الجزيرة",
      note: "زهري - ناعم - عنبري",
      price: "365 ر.س",
    },
    {
      name: "سحر الصحراء",
      note: "توابل - بخور - مسك",
      price: "510 ر.س",
    },
    {
      name: "ليل الأندلس",
      note: "حمضيات - عنبر - عود",
      price: "395 ر.س",
    },
  ];

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
          {highlights.map((product) => (
            <article
              key={product.name}
              className="editorial-shell group relative overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-l from-transparent via-primary/65 to-transparent" />
              <p className="text-[11px] tracking-[0.28em] text-muted-foreground uppercase">
                Exclusive
              </p>
              <h3 className="mt-4 text-xl leading-snug font-medium">
                {product.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {product.note}
              </p>
              <p className="mt-6 text-lg font-semibold text-primary">
                {product.price}
              </p>
            </article>
          ))}
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
