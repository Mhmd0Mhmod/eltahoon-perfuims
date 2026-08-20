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
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MarketKey, markets } from "@/config/markets";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import {
  ArrowLeft,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import CartDrawerItem from "./CartDrawerItem";
import MarketLink from "@/components/MarketLink";

interface CartDrawerProps {
  children?: React.ReactNode;
  marketKey?: string;
}

export function CartDrawer({ children, marketKey }: CartDrawerProps) {
  const isOpen = useCartStore((state) => state.isOpen);
  const setIsOpen = useCartStore((state) => state.setIsOpen);
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const params = useParams<{ market?: string }>();
  const activeMarketKey = (
    marketKey ||
    params?.market ||
    "eg"
  ).toLowerCase() as MarketKey;
  const market = markets[activeMarketKey] || markets.eg;

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce(
    (acc, item) => acc + item.variantDetails.newPrice * item.quantity,
    0,
  );

  const freeShippingThreshold = activeMarketKey === "eg" ? 1500 : 250;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const progressToFreeShipping = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100),
  );
  const remainingForFreeShipping = Math.max(
    0,
    freeShippingThreshold - subtotal,
  );

  const handleClearCart = () => {
    clearCart();
    toast.success("تم تفريغ سلة التسوق بنجاح");
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {children && (
        <SheetTrigger
          render={
            typeof children === "function"
              ? undefined
              : (children as React.ReactElement)
          }
        >
          {typeof children === "function"
            ? (children as () => React.ReactNode)()
            : null}
        </SheetTrigger>
      )}

      <SheetContent
        side="left"
        className="flex h-full w-full flex-col gap-0 p-0 sm:max-w-md"
        dir="rtl"
      >
        {/* Header */}
        <SheetHeader className="border-b p-4 text-right">
          <div className="flex items-center justify-between pl-6">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-lg">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <div>
                <SheetTitle className="text-base font-bold">
                  سلة التسوق
                </SheetTitle>
                <SheetDescription className="text-muted-foreground text-xs">
                  {totalItems > 0
                    ? `${totalItems} ${totalItems === 1 ? "منتج" : "منتجات"} في السلة`
                    : "لا توجد منتجات حالياً"}
                </SheetDescription>
              </div>
            </div>
          </div>
        </SheetHeader>
        {/* Content Area */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
            <div className="bg-muted mb-4 flex h-20 w-20 items-center justify-center rounded-full border shadow-2xs">
              <ShoppingBag className="text-muted-foreground h-10 w-10" />
            </div>
            <h3 className="mb-1 text-lg font-bold">سلة التسوق فارغة</h3>
            <p className="text-muted-foreground mb-6 max-w-xs text-xs">
              لم تقم بإضافة أي عطور إلى سلتك بعد. استكشف تشكيلتنا الفاخرة واختر
              ما يناسب ذوقك.
            </p>
            <MarketLink
              href={`/products`}
              onClick={handleClose}
              className="w-full max-w-xs"
            >
              <Button className="w-full gap-2" size="sm">
                <span>تصفح العطور الآن</span>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </MarketLink>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-4 divide-y divide-border/60">
            {items.map((item) => (
              <CartDrawerItem key={item.id} item={item} onClose={handleClose} />
            ))}
          </div>
        )}

        {/* Footer Area */}
        {items.length > 0 && (
          <div className="bg-background border-t p-4 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">المجموع الفرعي</span>
                <span className="text-foreground text-sm font-bold">
                  {formatCurrency(subtotal, market.currency, market.locale)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">الشحن والتوصيل</span>
                <span className="text-xs font-semibold">
                  {isFreeShipping ? (
                    <span className="text-emerald-600 dark:text-emerald-400">
                      مجاني
                    </span>
                  ) : (
                    <span className="text-muted-foreground">
                      يُحسب عند إتمام الشراء
                    </span>
                  )}
                </span>
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="space-y-2">
              <MarketLink
                href={`/checkout`}
                onClick={handleClose}
                className="block w-full"
              >
                <Button size="lg" className="w-full gap-2 font-bold shadow-xs">
                  <span>المتابعة لإتمام الشراء</span>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </MarketLink>

              <MarketLink
                href={`/cart`}
                onClick={handleClose}
                className="block w-full"
              >
                <Button variant="outline" size="sm" className="w-full text-xs">
                  عرض تفاصيل سلة التسوق
                </Button>
              </MarketLink>
            </div>

            {/* Micro Trust */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span>دفع إلكتروني آمن 100% • منتجات أصلية ومضمونة</span>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
