import { Quote } from "lucide-react";

function Testimonials() {
  const testimonials = [
    {
      quote:
        "عطور طاحون غيّرت نظرتي للعطور العربية. رائحة العود عندهم فريدة وتدوم طوال اليوم.",
      name: "سارة أحمد",
      location: "الرياض",
    },
    {
      quote:
        "أفضل متجر عطور تعاملت معه. الجودة ممتازة والتغليف فاخر. أنصح الجميع بتجربة مجموعة العود.",
      name: "محمد العلي",
      location: "القاهرة",
    },
    {
      quote:
        "هدية مثالية لعائلتي. العطر يجمع بين الأصالة والحداثة بأسلوب راقي. شكراً مؤسسة طاحون.",
      name: "نورة الحربي",
      location: "جدة",
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-[11px] tracking-[0.35em] text-primary/85 uppercase">
            Testimonials
          </p>
          <h2 className="text-3xl font-semibold md:text-4xl">
            ماذا يقول
            <span className="text-primary"> عملاؤنا</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-muted-foreground">
            تجارب حقيقية من عملاء وفَّقنا الله بخدمتهم، ممن وثقوا بنا وشاركوا
            رائحة تستحق الثقة.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="editorial-shell relative p-7 text-right transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-l from-transparent via-primary/40 to-transparent" />

              <div className="mb-5 flex h-10 w-10 items-center justify-center border border-primary/25 bg-primary/5">
                <Quote className="text-primary h-4 w-4" />
              </div>

              <p className="text-sm leading-8 text-muted-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="mt-6 border-t border-foreground/8 pt-5">
                <p className="text-base font-medium">{testimonial.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
