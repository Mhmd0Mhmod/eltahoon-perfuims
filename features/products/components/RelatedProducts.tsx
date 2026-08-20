"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { IProduct } from "../types";
import { ProductCard } from "./ProductCard";

interface RelatedProductsProps {
  products: IProduct[];
  market?: {
    code: string;
    currency: string;
    locale: string;
  };
}

export function RelatedProducts({ products, market }: RelatedProductsProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="px-0 pb-6 text-right">
        <div className="flex items-center gap-2">
          <Sparkles className="text-primary h-5 w-5" />
          <CardTitle className="text-2xl font-bold">منتجات قد تعجبك أيضاً</CardTitle>
        </div>
        <CardDescription>
          تشكيلة مختارة من أفضل العطور التي تناسب ذوقك الرفيع
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} market={market} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
