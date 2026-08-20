"use client";

import { useMarket } from "@/app/providers";
import FormatCurrency from "@/components/FormatCurrency";
import MarketLink from "@/components/MarketLink";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/useCartStore";
import { Minus, Plus, Sparkles, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { CartItem } from "../types";

function CartDrawerItem({
  item,
  onClose,
}: {
  item: CartItem;
  onClose: () => void;
}) {
  const [imageError, setImageError] = useState(false);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const { market } = useMarket();

  const variant = item.variantDetails;
  const imageSrc =
    imageError || !variant.imageUrl ? "/assets/logo.png" : variant.imageUrl;
  const itemTotal = variant.newPrice * item.quantity;
  const hasOffer = !!variant.offerResponseDTO;

  const handleRemove = () => {
    removeItem(item.id);
    toast.success(`تمت إزالة ${variant.name} من السلة`);
  };

  return (
    <div className="flex items-start gap-3 py-3 text-right">
      {/* Product Image */}
      <MarketLink
        href={`/products/${item.productId}`}
        onClick={onClose}
        className="bg-muted/40 relative h-18 w-18 shrink-0 overflow-hidden rounded-xl border"
      >
        <Image
          src={imageSrc}
          alt={variant.name || "عطر"}
          fill
          sizes="72px"
          className="object-cover transition-transform duration-300 hover:scale-105"
          onError={() => setImageError(true)}
        />
      </MarketLink>

      {/* Info & Controls */}
      <div className="flex flex-1 flex-col justify-between self-stretch gap-1.5">
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            <MarketLink
              href={`/products/${item.productId}`}
              onClick={onClose}
              className="hover:text-primary line-clamp-1 text-sm font-semibold transition-colors"
            >
              {variant.name}
            </MarketLink>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 -mt-1 -mr-1 h-7 w-7 shrink-0"
              aria-label="حذف العنصر"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
              {variant.size} {variant.unit}
            </Badge>

            {hasOffer && (
              <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 px-1.5 py-0 text-[10px]">
                <Sparkles className="ml-1 h-2.5 w-2.5" />
                {variant.offerResponseDTO?.title || "عرض"}
              </Badge>
            )}
          </div>
        </div>

        {/* Price and Quantity */}
        <div className="flex items-center justify-between pt-1">
          {/* Stepper */}
          <div className="bg-muted/60 flex items-center rounded-md border p-0.5">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-xs"
              onClick={() => decreaseQuantity(item.id)}
              disabled={item.quantity <= 1}
              aria-label="تقليل الكمية"
            >
              <Minus className="h-3 w-3" />
            </Button>

            <span className="w-6 text-center text-xs font-semibold">
              {item.quantity}
            </span>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-xs"
              onClick={() => increaseQuantity(item.id)}
              aria-label="زيادة الكمية"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Line Total */}
          <div className="text-left">
            <span className="text-primary text-sm font-bold">
              <FormatCurrency value={itemTotal} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CartDrawerItem;
