"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Market } from "@/config/markets";
import { useCartStore } from "@/stores/useCartStore";
import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CartEmptyState } from "./CartEmptyState";
import { CartItemCard } from "./CartItemCard";
import { CartSummary } from "./CartSummary";
import MarketLink from "@/components/MarketLink";

export function CartView() {
  const cartStore = useCartStore((state) => state);
  const { removeItem, increaseQuantity, clearCart, decreaseQuantity, items } =
    cartStore;
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce(
    (acc, item) => acc + item.variantDetails.newPrice * item.quantity,
    0,
  );

  const handleRemove = (id: number) => {
    const item = items.find((i) => i.id === id);
    removeItem(id);
    toast.success(
      item
        ? `تمت إزالة ${item.variantDetails.name} من السلة`
        : "تمت إزالة العنصر من السلة",
    );
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("تم تفريغ سلة التسوق بنجاح");
  };

  if (items.length === 0) {
    return <CartEmptyState />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-6">
        <div className="flex items-center gap-3">
          <MarketLink href={`/products`} aria-label="العودة إلى المنتجات">
            <Button variant="outline" size="icon" className="h-9 w-9">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </MarketLink>

          <div className="text-right">
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                سلة التسوق
              </h1>
              <span className="bg-primary/10 text-primary flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-bold">
                {totalItems}
              </span>
            </div>
            <p className="text-muted-foreground mt-0.5 text-xs md:text-sm">
              راجع منتجاتك المختارة وتأكد من تفاصيل الطلب
            </p>
          </div>
        </div>

        {/* Clear Cart Button with Confirmation */}
        <AlertDialog>
          <AlertDialogTrigger
            render={
              <Button
                variant="outline"
                size="sm"
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-1.5 self-start sm:self-auto"
              />
            }
          >
            <Trash2 className="h-4 w-4" />
            <span>تفريغ السلة</span>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>تأكيد تفريغ السلة</AlertDialogTitle>
              <AlertDialogDescription>
                هل أنت متأكد من رغبتك في حذف جميع المنتجات من سلة التسوق؟ لا
                يمكن التراجع عن هذا الإجراء.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>إلغاء</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                onClick={handleClearCart}
              >
                تفريغ السلة
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Cart Main Content */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
        {/* Items List */}
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <CartItemCard
              key={item.id}
              item={item}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onRemove={handleRemove}
            />
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <CartSummary totalItems={totalItems} subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
}
