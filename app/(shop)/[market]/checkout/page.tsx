"use client";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { CheckoutForm } from "@/features/checkout/components/CheckoutForm";
import { CreditCard, ShieldCheck } from "lucide-react";

export default function CheckoutPage() {
  const { userProfile: user } = useAuth();
  return (
    <div className="container mx-auto px-4 py-10 md:px-6" dir="rtl">
      {/* Page Title Header */}
      <div className="mb-8 space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          إتمام الطلب
        </h1>
        <p className="text-muted-foreground">
          قم بتعبئة معلومات الشحن والدفع لإتمام عملية الشراء
        </p>
      </div>

      {/* Checkout Form & Order Summary */}
      <div className="mx-auto max-w-7xl">
        <CheckoutForm user={user} />
      </div>

      {/* Security and Terms Footer */}
      <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center">
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <CreditCard className="h-4 w-4" />
          <ShieldCheck className="text-primary h-4 w-4" />
          <span>تشفير آمن بنسبة 100% لمعلوماتك وبياناتك</span>
        </div>
        <p className="text-muted-foreground max-w-md text-xs">
          بالنقر على &quot;إتمام الشراء الآن&quot;، فإنك توافق على شروط الخدمة
          وسياسة الخصوصية الخاصة بمتجرنا.
        </p>
      </div>
    </div>
  );
}
