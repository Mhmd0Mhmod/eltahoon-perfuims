import { Badge } from "@/components/ui/badge";

async function Categories() {
  const categories = [
    {
      title: "دهن العود",
      description: "تركيز عميق بنفحات خشبية أصيلة.",
    },
    {
      title: "المسك",
      description: "روائح نقية بتوقيع ناعم وفاخر.",
    },
    {
      title: "العطور الشرقية",
      description: "مزج عطري غني بين البخور والعنبر.",
    },
    {
      title: "باقات الهدايا",
      description: "تصاميم راقية للإهداء والمناسبات.",
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <Badge className="mb-4 rounded-none border border-primary/35 bg-transparent px-4 py-1 text-[11px] tracking-[0.3em] text-primary uppercase">
            Categories
          </Badge>
          <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
            تسوق وفق أسلوبك
            <span className="text-primary"> العطري</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            تصنيفات مصاغة لتسهيل رحلة الاختيار بين الروائح العربية الكلاسيكية
            واللمسات الحديثة.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <article
              key={category.title}
              className="editorial-shell relative p-6 text-right"
            >
              <span className="text-primary/75 text-[11px] tracking-[0.32em] uppercase">
                0{index + 1}
              </span>
              <h3 className="mt-4 text-xl font-medium">{category.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {category.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
