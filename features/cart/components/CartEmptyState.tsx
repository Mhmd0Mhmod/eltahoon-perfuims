"use client";

import MarketLink from "@/components/MarketLink";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag, Sparkles } from "lucide-react";
import Link from "next/link";
export function CartEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="relative mb-6">
        <div className="bg-muted flex h-24 w-24 items-center justify-center rounded-full border shadow-xs">
          <ShoppingBag className="text-muted-foreground h-12 w-12" />
        </div>
        <div className="bg-primary absolute -top-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full text-white shadow-xs">
          <Sparkles className="h-4 w-4" />
        </div>
      </div>

      <h2 className="mb-2 text-2xl font-bold tracking-tight">
        سلة التسوق فارغة
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md text-sm">
        لم تقم بإضافة أي عطور إلى سلة التسوق الخاصة بك بعد. تصفح تشكيلتنا
        المميزة واختر عطرك المفضل.
      </p>

      <MarketLink href={`/products`}>
        <Button size="lg" className="gap-2 px-8">
          <span>ابدأ التسوق الآن</span>
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </MarketLink>
    </div>
  );
}
