import { Card, CardContent } from "@/components/ui/card";
import { Truck, ShieldCheck, HeadphonesIcon, Gift } from "lucide-react";

function Features() {
  const features = [
    {
      icon: Truck,
      title: "شحن فاخر",
      description: "توصيل مجاني للطلبات فوق 500 ريال",
    },
    {
      icon: ShieldCheck,
      title: "أصالة موثقة",
      description: "كل منتج معتمد من مؤسسة طاحون",
    },
    {
      icon: HeadphonesIcon,
      title: "استشارة عطرية",
      description: "دعم شخصي لاختيار الرائحة المناسبة",
    },
    {
      icon: Gift,
      title: "تغليف هدايا",
      description: "تنسيق أنيق للمناسبات الخاصة",
    },
  ];

  return (
    <section className="py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="heritage-divider h-px w-full" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="bg-transparent py-8 shadow-none ring-0"
            >
              <CardContent className="flex items-start gap-4 p-0">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-none border border-primary/35 bg-primary/8">
                  <feature.icon className="text-primary h-5 w-5" />
                </div>
                <div className="flex-1 text-right">
                  <h3 className="mb-2 text-lg font-medium">{feature.title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="heritage-divider h-px w-full" />
      </div>
    </section>
  );
}

export default Features;
