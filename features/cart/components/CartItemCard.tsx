"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Market } from "@/config/markets";
import { formatCurrency } from "@/lib/utils";
import { CartItem } from "../types";
import { Minus, Plus, Sparkles, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CartItemCardProps {
  item: CartItem;
  market: Market;
  marketKey: string;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}

export function CartItemCard({
  item,
  market,
  marketKey,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemCardProps) {
  const [imageError, setImageError] = useState(false);
  const variant = item.variantDetails;
  const imageSrc =
    imageError || !variant.imageUrl ? "/assets/logo.png" : variant.imageUrl;

  const itemTotal = variant.newPrice * item.quantity;
  const hasOffer = !!variant.offerResponseDTO;

  return (
    <Card className="overflow-hidden p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Product Info & Image */}
        <div className="flex items-center gap-4">
          <Link
            href={`/${marketKey}/products/${item.productId}`}
            className="bg-muted/40 relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border sm:h-24 sm:w-24"
          >
            <Image
              src={imageSrc}
              alt={variant.name || "عطر"}
              fill
              sizes="(max-width: 640px) 80px, 96px"
              className="object-cover transition-transform duration-300 hover:scale-105"
              onError={() => setImageError(true)}
            />
          </Link>

          <div className="space-y-1.5 text-right">
            <Link
              href={`/${marketKey}/products/${item.productId}`}
              className="hover:text-primary line-clamp-1 font-semibold transition-colors"
            >
              {variant.name}
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {variant.size} {variant.unit}
              </Badge>

              {hasOffer && (
                <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-[11px]">
                  <Sparkles className="ml-1 h-3 w-3" />
                  {variant.offerResponseDTO?.title || "عرض خاص"}
                </Badge>
              )}
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-primary font-bold">
                {formatCurrency(variant.newPrice, market.currency, market.locale)}
              </span>
              {variant.oldPrice && variant.oldPrice > variant.newPrice && (
                <span className="text-muted-foreground text-xs line-through">
                  {formatCurrency(variant.oldPrice, market.currency, market.locale)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quantity Controls and Total */}
        <div className="flex items-center justify-between border-t pt-3 sm:border-t-0 sm:pt-0 sm:gap-6">
          {/* Stepper */}
          <div className="bg-muted/50 flex items-center rounded-lg border p-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-md"
              onClick={() => onDecrease(item.id)}
              disabled={item.quantity <= 1}
              aria-label="تقليل الكمية"
            >
              <Minus className="h-3.5 w-3.5" />
            </Button>

            <span className="w-9 text-center text-sm font-semibold">
              {item.quantity}
            </span>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-md"
              onClick={() => onIncrease(item.id)}
              aria-label="زيادة الكمية"
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Line Total */}
          <div className="text-left sm:min-w-24">
            <span className="text-muted-foreground block text-[11px] sm:hidden">
              المجموع:
            </span>
            <span className="text-base font-bold sm:text-lg">
              {formatCurrency(itemTotal, market.currency, market.locale)}
            </span>
          </div>

          {/* Delete Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onRemove(item.id)}
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8"
            aria-label="حذف العنصر"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
