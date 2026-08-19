import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ShoppingBag } from "lucide-react";
import Link from "next/link";

export function EmptyOrders() {
  return (
    <Card className="py-16">
      <CardContent className="flex flex-col items-center justify-center text-center">
        <div className="bg-primary/10 mb-4 rounded-full p-4">
          <Package className="text-primary h-12 w-12" />
        </div>
        <h3 className="mb-2 text-xl font-semibold">لا توجد طلبات بعد</h3>
        <p className="text-muted-foreground mb-6 max-w-sm">
          لم تقم بأي طلبات حتى الآن. ابدأ بتصفح منتجاتنا واستمتع بتجربة تسوق
          مميزة.
        </p>
        <Button className="gap-2">
          <Link href="/products">
            <ShoppingBag className="h-4 w-4" />
            تصفح المنتجات
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
