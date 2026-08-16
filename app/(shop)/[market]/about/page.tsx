import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="text-right">
        <h1 className="mb-2 text-4xl font-bold">من نحن</h1>
        <p className="text-muted-foreground mb-8">About Us</p>

        <Separator className="mb-8" />

        <div className="space-y-6 text-right">
          <section>
            <h2 className="mb-4 text-2xl font-semibold">عن مؤسسه طاحون</h2>
            <p className="text-muted-foreground leading-relaxed">
              مؤسسه طاحون - المسك للعطور، متجر متخصص في بيع العطور العربية الفاخرة والعود والمسك
              الأصيل. نسعى لتوفير تجربة تسوق استثنائية لعملائنا من خلال تقديم منتجات عالية الجودة
              مستوحاة من التراث العربي الأصيل وخدمة عملاء متميزة.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">رؤيتنا</h2>
            <p className="text-muted-foreground leading-relaxed">
              أن نكون الوجهة الأولى لمحبي العطور العربية الأصيلة في المنطقة، ونقدم لهم أفضل تجربة
              تسوق عبر الإنترنت مع ضمان الجودة والأصالة لجميع منتجاتنا من العود والمسك والعطور
              الفاخرة.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">مهمتنا</h2>
            <p className="text-muted-foreground leading-relaxed">
              توفير مجموعة واسعة من العطور العربية الفاخرة الأصيلة والعود والمسك بأسعار تنافسية، مع
              تقديم خدمة توصيل سريعة وآمنة، وضمان رضا العملاء بنسبة 100%.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">لماذا نحن؟</h2>
            <ul className="text-muted-foreground space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>جميع منتجاتنا أصلية 100% ومن مصادر موثوقة</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>أسعار تنافسية وعروض خاصة مستمرة</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>شحن سريع وآمن لجميع المناطق</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>خدمة عملاء متاحة على مدار الساعة</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>سياسة استرجاع مرنة</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
