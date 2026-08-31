function BrandStory() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="heritage-divider h-px w-full" />

        <div className="grid items-center gap-10 py-14 md:grid-cols-2 md:gap-16 md:py-20">
          <div className="text-right">
            <p className="mb-3 text-[11px] tracking-[0.35em] text-primary/85 uppercase">
              Our Heritage
            </p>
            <h2 className="text-3xl leading-tight font-semibold md:text-4xl">
              قصة عطر
              <span className="block text-primary">وراثةٌ و أصالة</span>
            </h2>
            <div className="heritage-divider mt-6 h-px w-28" />
            <p className="mt-6 text-sm leading-8 text-muted-foreground md:text-base">
              منذ عام ١٩٨٧ و مؤسسة طاحون تصنع العطور العربية الأصيلة بعناية.
              نجمع بين تراث عطري عريق ولمسة عصرية، لنقدم لك روائح تحكي قصة
              فريدة في كل نفحه.
            </p>
            <p className="mt-4 text-sm leading-8 text-muted-foreground md:text-base">
              كل زجاجة هي نتاج شغفٍ بالجودة واحترامٍ لفن العطور الشرقية،
              مصمّمة لتترك بصمة لا تُنسى.
            </p>

            <div className="mt-8 flex items-center gap-8">
              <div className="text-right">
                <p className="text-2xl font-semibold text-primary">٣٧+</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  عام من الخبرة
                </p>
              </div>
              <div className="h-10 w-px bg-foreground/12" />
              <div className="text-right">
                <p className="text-2xl font-semibold text-primary">٢٠٠+</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  عطر فريد
                </p>
              </div>
              <div className="h-10 w-px bg-foreground/12" />
              <div className="text-right">
                <p className="text-2xl font-semibold text-primary">٥٠ ألف+</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  عميل راضٍ
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="editorial-shell relative overflow-hidden p-8 md:p-10">
              <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_30%_30%,rgba(198,156,74,0.15),transparent_50%)]" />

              <div className="relative space-y-6 text-right">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-primary/30 bg-primary/8 text-lg font-semibold text-primary">
                    ١
                  </div>
                  <div>
                    <h4 className="text-base font-medium">
                      منتقاة من أجود المواد
                    </h4>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground">
                      مكونات طبيعية مختارة من أرقى مزارع العود والمسك في
                      الشرق الأوسط.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-primary/30 bg-primary/8 text-lg font-semibold text-primary">
                    ٢
                  </div>
                  <div>
                    <h4 className="text-base font-medium">
                      صياغة عطرية دقيقة
                    </h4>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground">
                      صنّاع عطور بخبرة عقود يمزجون بين الأصالة والحداثة في كل
                      إبداع.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-primary/30 bg-primary/8 text-lg font-semibold text-primary">
                    ٣
                  </div>
                  <div>
                    <h4 className="text-base font-medium">
                      تجربة فاخرة كاملة
                    </h4>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground">
                      من التغليف الأنيق إلى الرائحة التي تدوم، كل تفصيل
                      مصمّم لتستمتع بتجربة عطرية استثنائية.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="heritage-divider h-px w-full" />
      </div>
    </section>
  );
}

export default BrandStory;
