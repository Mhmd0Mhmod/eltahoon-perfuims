"use client";

import FormatCurrency from "@/components/FormatCurrency";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { markets } from "@/config/markets";
import { useCartStore } from "@/stores/useCartStore";
import {
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Info,
  Minus,
  Package,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { IProduct, IProductVariant } from "../types";
import { formatDate } from "date-fns";

interface ProductDetailsProps {
  product: IProduct;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedVariant, setSelectedVariant] =
    useState<IProductVariant | null>(
      () =>
        product.variants?.find((v) => v.isAvailable) ||
        product.variants?.[0] ||
        null,
    );
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);

  const prices = product.variants?.map((v) => v.newPrice) || [];
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  const hasOffer = product.variants?.some((v) => !!v.offerResponseDTO);
  const offersList = Array.from(
    new Set(
      product.variants
        ?.filter((v) => !!v.offerResponseDTO)
        .map(
          (v) =>
            `${v.offerResponseDTO?.title}: ${v.offerResponseDTO?.description}`,
        ) || [],
    ),
  );

  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast.error("يرجى اختيار الحجم المناسب");
      return;
    }
    if (!selectedVariant.isAvailable) {
      toast.error("هذا الحجم غير متوفر حالياً");
      return;
    }
    const market = markets[product.countryCode];
    addItem({
      productId: product.id,
      countryCode: market?.code || "eg",
      countryName: market?.name || "مصر",
      variantDetails: selectedVariant,
      quantity,
    });
    openCart();
    toast.success(
      `تمت إضافة ${quantity} × ${product.name} (${selectedVariant.size} ${selectedVariant.unit}) إلى السلة`,
    );
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("تم نسخ رابط المنتج");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const currentPrice = selectedVariant ? selectedVariant.newPrice : minPrice;
  const currentOldPrice = selectedVariant?.oldPrice;

  return (
    <div className="mx-auto max-w-6xl space-y-12">
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
        {/* ========== Left Column: Media & Trust Badges ========== */}
        <div className="sticky top-8 flex flex-col gap-6">
          {/* Main Image */}
          <div className="bg-muted/40 relative aspect-square w-full overflow-hidden rounded-2xl border shadow-sm">
            <Image
              src={
                imageError || !product.imageUrl
                  ? "/assets/logo.png"
                  : product.imageUrl
              }
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
              priority
              onError={() => setImageError(true)}
            />

            {/* Offer Badge Overlay */}
            {hasOffer && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-amber-500 px-3 py-1 text-sm font-semibold text-white shadow-md">
                  <Sparkles className="ml-1.5 h-4 w-4" />
                  عرض مميز
                </Badge>
              </div>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card flex flex-col items-center gap-2 rounded-xl border p-3.5 text-center shadow-2xs">
              <Star className="h-6 w-6 text-amber-500" />
              <span className="text-foreground text-xs font-semibold">
                عطور أصلية 100%
              </span>
              <span className="text-muted-foreground text-[10px]">
                أعلى درجات الثبات
              </span>
            </div>
            <div className="bg-card flex flex-col items-center gap-2 rounded-xl border p-3.5 text-center shadow-2xs">
              <ShieldCheck className="h-6 w-6 text-emerald-500" />
              <span className="text-foreground text-xs font-semibold">
                ضمان الجودة
              </span>
              <span className="text-muted-foreground text-[10px]">
                استبدال واسترجاع ميسر
              </span>
            </div>
            <div className="bg-card flex flex-col items-center gap-2 rounded-xl border p-3.5 text-center shadow-2xs">
              <Truck className="text-primary h-6 w-6" />
              <span className="text-foreground text-xs font-semibold">
                توصيل سريع
              </span>
              <span className="text-muted-foreground text-[10px]">
                شحن آمن ومحمي
              </span>
            </div>
          </div>
        </div>

        {/* ========== Right Column: Details & Purchasing ========== */}
        <div className="flex flex-col gap-6 text-right">
          {/* Header & Categories */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {product.categories?.map((cat) => (
                  <Badge key={cat.id} variant="secondary" className="text-xs">
                    {cat.name}
                  </Badge>
                ))}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="gap-1.5 text-xs"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                <span>مشاركة</span>
              </Button>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {product.name}
            </h1>

            {product.description && (
              <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                {product.description}
              </p>
            )}
          </div>

          <Separator />

          {/* Pricing Section */}
          <div className="space-y-1">
            <span className="text-muted-foreground text-xs font-medium">
              السعر الحالي:
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-primary text-3xl font-extrabold">
                <FormatCurrency
                  value={currentPrice}
                  marketKey={product.countryCode}
                />
              </span>

              {currentOldPrice && currentOldPrice > currentPrice && (
                <span className="text-muted-foreground text-lg line-through">
                  <FormatCurrency
                    value={currentOldPrice}
                    marketKey={product.countryCode}
                  />
                </span>
              )}

              {!selectedVariant && minPrice !== maxPrice && (
                <span className="text-muted-foreground text-sm">
                  (يتراوح حسب الحجم المختار)
                </span>
              )}
            </div>
          </div>

          <Separator />

          {/* Variant Selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">اختر الحجم:</span>
                {selectedVariant && (
                  <span className="text-muted-foreground text-xs">
                    الحجم المختار: {selectedVariant.size} {selectedVariant.unit}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {product.variants.map((variant) => {
                  const isSelected = selectedVariant?.id === variant.id;
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      disabled={!variant.isAvailable}
                      onClick={() => setSelectedVariant(variant)}
                      className={`relative flex flex-col items-center justify-center rounded-xl border p-3 transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5 ring-primary/30 ring-2"
                          : variant.isAvailable
                            ? "bg-card hover:border-primary/50"
                            : "bg-muted/40 opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <span className="text-sm font-bold">
                        {variant.size} {variant.unit}
                      </span>
                      <span className="text-primary mt-1 text-xs font-medium">
                        <FormatCurrency
                          value={variant.newPrice}
                          marketKey={product.countryCode}
                        />
                      </span>
                      {!variant.isAvailable && (
                        <span className="text-destructive mt-1 text-[10px]">
                          غير متوفر
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="space-y-3 pt-2">
            <span className="text-sm font-semibold">الكمية:</span>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* Quantity Controls */}
              <div className="flex items-center rounded-xl border">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-r-xl"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center text-sm font-bold">
                  {quantity}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-l-xl"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Add to Cart Button */}
              <Button
                type="button"
                size="lg"
                disabled={!selectedVariant?.isAvailable}
                onClick={handleAddToCart}
                className="flex-1 gap-2 rounded-xl text-base font-bold shadow-md"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>إضافة إلى سلة المشتريات</span>
              </Button>
            </div>
          </div>

          <Separator />

          {/* Variants Table / Overview */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Package className="text-primary h-4 w-4" />
              <span className="text-sm font-semibold">
                تفاصيل الأحجام والأسعار
              </span>
            </div>
            <div className="space-y-2">
              {product.variants?.map((variant) => (
                <div
                  key={variant.id}
                  className={`flex items-center justify-between rounded-xl border p-3 text-sm transition-colors ${
                    selectedVariant?.id === variant.id
                      ? "bg-primary/5 border-primary/40"
                      : "bg-card"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {variant.isAvailable ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <XCircle className="text-destructive h-4 w-4" />
                    )}
                    <span className="font-medium">
                      {variant.size} {variant.unit}
                    </span>
                    {!variant.isAvailable && (
                      <Badge variant="destructive" className="text-[10px]">
                        غير متوفر
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {variant.oldPrice &&
                      variant.oldPrice > variant.newPrice && (
                        <span className="text-muted-foreground text-xs line-through">
                          <FormatCurrency
                            value={variant.oldPrice}
                            marketKey={product.countryCode}
                          />
                        </span>
                      )}
                    <span className="text-primary font-bold">
                      <FormatCurrency
                        value={variant.newPrice}
                        marketKey={product.countryCode}
                      />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Special Offers Section */}
          {offersList.length > 0 && (
            <Card className="border-amber-500/30 bg-amber-500/5">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                  <Sparkles className="h-4 w-4" />
                  <span>تفاصيل العروض المتاحة</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-xs leading-relaxed text-amber-900 dark:text-amber-200">
                {offersList.map((offerText, idx) => (
                  <p key={idx}>• {offerText}</p>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Meta Info */}
          <div className="text-muted-foreground flex flex-wrap items-center gap-4 pt-2 text-xs">
            {product.createdAt && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>
                  أضيف بتاريخ: {formatDate(product.createdAt, "dd/mm/yyyy")}
                </span>
              </div>
            )}
            {product.updatedAt && (
              <div className="flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5" />
                <span>
                  آخر تحديث: {formatDate(product.updatedAt, "dd/mm/yyyy")}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
