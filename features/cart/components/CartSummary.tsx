"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Market } from "@/config/markets";
import { formatCurrency } from "@/lib/utils";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tag,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface CartSummaryProps {
  market: Market;
  marketKey: string;
  totalItems: number;
  subtotal: number;
}

export function CartSummary({
  market,
  marketKey,
  totalItems,
  subtotal,
}: CartSummaryProps) {
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Free shipping threshold based on market
  const freeShippingThreshold = market.code.toUpperCase() === "EG" ? 1500 : 250;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const progressToFreeShipping = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100),
  );
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingAmount = isFreeShipping ? 0 : market.code.toUpperCase() === "EG" ? 50 : 25;
  const finalTotal = Math.max(0, subtotal - discountAmount + (subtotal > 0 ? shippingAmount : 0));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      toast.error("يرجى إدخال رمز الكوبون");
      return;
    }

    if (code === "TAHOON10" || code === "WELCOME10" || code === "OFFER10") {
      setDiscountPercent(10);
      setAppliedCoupon(code);
      toast.success("تم تطبيق خصم 10% بنجاح!");
    } else if (code === "VIP20") {
      setDiscountPercent(20);
      setAppliedCoupon(code);
      toast.success("تم تطبيق خصم 20% بنجاح!");
    } else {
      // General demo coupon acceptance
      setDiscountPercent(5);
      setAppliedCoupon(code);
      toast.success(`تم تفعيل الكوبون "${code}" وحصلت على خصم 5%!`);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscountPercent(0);
    setCouponCode("");
    toast.info("تم إلغاء كود الخصم");
  };

  return (
    <div className="space-y-6">
      {/* Free Shipping Progress Indicator */}
      <Card className="overflow-hidden border p-4 shadow-2xs">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="flex items-center gap-1.5">
              <Truck className="text-primary h-4 w-4" />
              {isFreeShipping ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  تهانينا! لقد حصلت على شحن مجاني
                </span>
              ) : (
                <span>
                  أضف بقيمة{" "}
                  <strong className="text-primary">
                    {formatCurrency(
                      remainingForFreeShipping,
                      market.currency,
                      market.locale,
                    )}
                  </strong>{" "}
                  للحصول على شحن مجاني
                </span>
              )}
            </span>
            <span className="text-muted-foreground">{progressToFreeShipping}%</span>
          </div>

          <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
            <div
              className="bg-primary h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Main Summary Card */}
      <Card className="sticky top-20 border shadow-xs">
        <CardHeader className="text-right pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShoppingBag className="text-primary h-5 w-5" />
            <span>ملخص الطلب</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-right">
          {/* Coupon Code Section */}
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="رمز الكوبون أو الخصم..."
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="pr-9 text-sm"
              />
            </div>
            <Button type="submit" variant="outline" size="sm">
              تطبيق
            </Button>
          </form>

          {appliedCoupon && (
            <div className="text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 flex items-center justify-between rounded-lg p-2.5 text-xs font-medium border border-emerald-500/20">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" />
                <span>
                  تم تفعيل الكوبون <strong>{appliedCoupon}</strong> (خصم{" "}
                  {discountPercent}%)
                </span>
              </div>
              <button
                type="button"
                onClick={handleRemoveCoupon}
                className="text-muted-foreground hover:text-destructive text-xs underline transition-colors"
              >
                إلغاء
              </button>
            </div>
          )}

          <Separator />

          {/* Pricing Breakdown */}
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                المجموع الفرعي ({totalItems} {totalItems === 1 ? "منتج" : "منتجات"})
              </span>
              <span className="font-semibold">
                {formatCurrency(subtotal, market.currency, market.locale)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">الشحن والتوصيل</span>
              <span className="font-semibold">
                {isFreeShipping ? (
                  <span className="text-emerald-600 dark:text-emerald-400">
                    مجاني
                  </span>
                ) : (
                  formatCurrency(shippingAmount, market.currency, market.locale)
                )}
              </span>
            </div>

            {discountAmount > 0 && (
              <div className="text-emerald-600 dark:text-emerald-400 flex justify-between font-medium">
                <span>الخصم المطبق</span>
                <span>
                  -{formatCurrency(discountAmount, market.currency, market.locale)}
                </span>
              </div>
            )}

            <Separator />

            <div className="flex items-center justify-between pt-1">
              <span className="text-base font-bold">الإجمالي التقديري</span>
              <span className="text-primary text-xl font-bold">
                {formatCurrency(finalTotal, market.currency, market.locale)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <Link href={`/${marketKey}/checkout`} className="w-full block">
              <Button size="lg" className="w-full gap-2 text-base font-bold">
                <span>المتابعة لإتمام الشراء</span>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>

            <Link href={`/${marketKey}/products`} className="w-full block">
              <Button variant="ghost" size="sm" className="w-full text-xs">
                متابعة التسوق وإضافة منتجات أخرى
              </Button>
            </Link>
          </div>

          {/* Guarantee Badges */}
          <div className="bg-muted/40 rounded-xl p-3 space-y-2 border text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-emerald-500 h-4 w-4 shrink-0" />
              <span>دفع آمن 100% مع أعلى درجات التشفير والحماية</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-primary h-4 w-4 shrink-0" />
              <span>ضمان أصالة العطور وإمكانية الاسترجاع الميسر</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
