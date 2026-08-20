"use client";

import FormatCurrency from "@/components/FormatCurrency";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Tag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CheckoutSummaryProps {
  subtotal?: number;
  shipping?: number;
  discount?: number;
}

export function CheckoutSummary({
  subtotal = 0,
  shipping = 0,
  discount = 0,
}: CheckoutSummaryProps) {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) {
      toast.error("يرجى إدخال كود الخصم");
      return;
    }
    setAppliedCoupon(couponCode.trim());
    toast.success("تم تطبيق كود الخصم بنجاح");
  };

  const total = Math.max(0, subtotal + shipping - discount);

  return (
    <Card className="sticky top-20 border shadow-xs">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <ShoppingBag className="text-primary h-5 w-5" />
          <span>ملخص الطلب</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Coupon Code Section */}
        <form onSubmit={handleApplyCoupon} className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="كود الخصم..."
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
          <div className="text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 flex items-center justify-between rounded-md p-2 text-xs font-medium">
            <span>تم تفعيل الكوبون: {appliedCoupon}</span>
            <button
              type="button"
              onClick={() => {
                setAppliedCoupon(null);
                setCouponCode("");
              }}
              className="text-muted-foreground hover:text-foreground text-xs underline"
            >
              إلغاء
            </button>
          </div>
        )}

        <Separator />

        {/* Pricing Breakdown */}
        <div className="space-y-2.5 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">المجموع الفرعي</span>
            <span className="font-medium">
              <FormatCurrency value={subtotal} />
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">الشحن</span>
            <span className="font-medium">
              {shipping === 0 ? "مجاني" : <FormatCurrency value={shipping} />}
            </span>
          </div>

          {discount > 0 && (
            <div className="text-emerald-600 dark:text-emerald-400 flex justify-between">
              <span>الخصم</span>
              <span className="font-medium">
                - <FormatCurrency value={discount} />
              </span>
            </div>
          )}

          <Separator />

          <div className="flex items-center justify-between pt-1">
            <span className="text-base font-bold">الإجمالي الكلي</span>
            <span className="text-primary text-xl font-bold">
              <FormatCurrency value={total} />
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
