"use client";

import FormatCurrency from "@/components/FormatCurrency";
import MarketLink from "@/components/MarketLink";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Eye, Package, ShoppingBag, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { IProduct } from "../types";

interface ProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const prices = product.variants?.map((v) => v.newPrice) || [];
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
  const hasOffer = product.variants?.some((v) => !!v.offerResponseDTO);
  const isAvailable = product.variants?.some((v) => v.isAvailable);
  const oldPrices = product.variants
    ?.filter((v) => v.oldPrice && v.oldPrice > v.newPrice)
    .map((v) => v.oldPrice as number);
  const maxOldPrice = oldPrices.length > 0 ? Math.max(...oldPrices) : null;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`تمت إضافة ${product.name} إلى السلة`);
  };
  const productUrl = `/products/${product.id}`;
  return (
    <Card className="group relative p-0  flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Product Image Container */}
      <div className="bg-muted/40 relative aspect-square w-full overflow-hidden">
        <MarketLink href={productUrl} className="block h-full w-full">
          <Image
            src={
              imageError || !product.imageUrl
                ? "/assets/logo.png"
                : product.imageUrl
            }
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        </MarketLink>

        {/* Badges Container */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {hasOffer && (
            <Badge className="bg-amber-500 text-white shadow-xs">
              <Sparkles className="ml-1 h-3 w-3" />
              عرض خاص
            </Badge>
          )}
          {!isAvailable && (
            <Badge variant="destructive" className="shadow-xs">
              نفد من المخزون
            </Badge>
          )}
        </div>

        {/* Category Badge */}
        {product.categories?.[0] && (
          <div className="absolute bottom-3 right-3">
            <Badge
              variant="secondary"
              className="bg-background/85 text-foreground backdrop-blur-xs text-xs font-normal"
            >
              {product.categories[0].name}
            </Badge>
          </div>
        )}

        {/* Quick View Overlay Button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
          <MarketLink
            href={productUrl}
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "gap-1.5 shadow-md",
            )}
          >
            <Eye className="h-4 w-4" />
            <span>عرض التفاصيل</span>
          </MarketLink>
        </div>
      </div>

      {/* Product Information */}
      <CardContent className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div className="space-y-2 text-right">
          <MarketLink
            href={productUrl}
            className="group-hover:text-primary transition-colors"
          >
            <h3 className="line-clamp-1 text-base font-bold sm:text-lg">
              {product.name}
            </h3>
          </MarketLink>
          {product.description && (
            <p className="text-muted-foreground line-clamp-2 text-xs sm:text-sm">
              {product.description}
            </p>
          )}

          {/* Sizes tag */}
          {product.variants && product.variants.length > 0 && (
            <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <Package className="h-3.5 w-3.5" />
              <span>
                {product.variants.length > 1
                  ? `${product.variants.length} أحجام متوفرة`
                  : `${product.variants[0].size} ${product.variants[0].unit}`}
              </span>
            </div>
          )}
        </div>

        {/* Pricing and Action */}
        <div className="mt-4 flex items-center justify-between border-t pt-3">
          <div className="flex flex-col text-right">
            {maxOldPrice && maxOldPrice > minPrice && (
              <span className="text-muted-foreground text-xs line-through">
                <FormatCurrency
                  value={maxOldPrice}
                  marketKey={product.countryCode}
                />
              </span>
            )}
            <div className="text-primary font-bold">
              {minPrice === maxPrice ? (
                <span className="text-base sm:text-lg">
                  <FormatCurrency
                    value={minPrice}
                    marketKey={product.countryCode}
                  />
                </span>
              ) : (
                <span className="text-sm sm:text-base">
                  <FormatCurrency
                    value={minPrice}
                    marketKey={product.countryCode}
                  />
                  -{" "}
                  <FormatCurrency
                    value={maxPrice}
                    marketKey={product.countryCode}
                  />
                </span>
              )}
            </div>
          </div>

          <Button
            size="sm"
            variant="default"
            disabled={!isAvailable}
            onClick={handleQuickAdd}
            className="gap-1.5 rounded-xl text-xs"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">أضف</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
