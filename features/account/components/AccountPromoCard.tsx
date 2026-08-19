import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";

function AccountPromoCard() {
  return (
    <Card className="from-primary/5 to-secondary/5 overflow-hidden border-0 bg-linear-to-br shadow-lg">
      <CardContent className="flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:text-right">
        <div className="bg-primary/10 rounded-full p-4">
          <ShoppingBag className="text-primary h-8 w-8" />
        </div>

        <div className="flex-1">
          <h3 className="mb-1 text-lg font-semibold">استكشف أحدث العطور</h3>

          <p className="text-muted-foreground text-sm">
            تصفح مجموعتنا الجديدة من العطور الفاخرة واستمتع بعروض حصرية
          </p>
        </div>

        <Button className="group shadow-md">
          <Link href="/products" className="flex items-center gap-2">
            تسوق الآن
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default AccountPromoCard;
