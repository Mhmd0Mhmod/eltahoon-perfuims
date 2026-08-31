"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User } from "@/types/user";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCartStore } from "@/stores/useCartStore";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Banknote,
  CreditCard,
  Mail,
  MapPin,
  Phone,
  User as UserIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CheckoutFormValues, checkoutSchema } from "../types";
import { CheckoutSummary } from "./CheckoutSummary";
import { createOrderAction } from "../../../app/(shop)/[market]/checkout/actions";
import Link from "next/link";
import { Button as LinkButton } from "@/components/ui/button";

interface CheckoutFormProps {
  user?: User | null;
}

export function CheckoutForm({ user }: CheckoutFormProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const cart = useCartStore((state) => state);
  const [couponCode, setCouponCode] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user?.fullName ?? "",
      email: user?.email ?? "",
      phoneNumber: user?.phoneNumber ?? "",
      city: "",
      address: user?.address ?? "",
      postalCode: "",
      notes: "",
      paymentMethod: "CASH_ON_DELIVERY",
    },
  });

  const selectedPaymentMethod = useWatch({
    control: form.control,
    name: "paymentMethod",
    defaultValue: "CASH_ON_DELIVERY",
  });

  async function onSubmit(data: CheckoutFormValues) {
    setIsSubmitting(true);
    const toastId = toast.loading("جاري تنفيذ طلبك...");

    try {
      if (cart.items.length === 0) {
        toast.error("سلة التسوق فارغة، أضف منتجات أولاً", { id: toastId });
        return;
      }

      const shippingAddress = [
        data.city,
        data.address,
        data.postalCode,
      ].filter(Boolean).join("، ");

      const syncItems = cart.items.map((item) => ({
        productVariantId: item.variantDetails.id,
        quantity: item.quantity,
      }));

      const result = await createOrderAction({
        shippingAddress,
        phoneNumber: data.phoneNumber,
        paymentMethod: data.paymentMethod,
        couponCode: couponCode || undefined,
        syncItems,
      });

      if (!result.success) {
        toast.error(result.message || "حدث خطأ أثناء إتمام الطلب", {
          id: toastId,
        });
        return;
      }

      const order = result.data;
      cart.clearCart();

      toast.success("تم إنشاء الطلب بنجاح!", { id: toastId });

      // Redirect to the payment gateway if provided (VISA), else the success page.
      if (order.paymentUrl) {
        window.location.href = order.paymentUrl;
      } else {
        router.push(`/payments/success?order=${order.orderId}`);
      }
    } catch {
      toast.error("حدث خطأ أثناء إتمام الطلب، يرجى المحاولة مرة أخرى", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (authLoading) {
    return <div className="p-10 text-center">جارِ التحميل...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-md space-y-4 py-16 text-center">
        <h2 className="text-2xl font-bold">يجب تسجيل الدخول أولاً</h2>
        <p className="text-muted-foreground">
          قم بتسجيل الدخول لإتمام عملية الشراء ومتابعة طلباتك.
        </p>
        <Link href="/login" className="block">
          <LinkButton className="w-full">تسجيل الدخول</LinkButton>
        </Link>
      </div>
    );
  }

  const paymentMethods = [
    {
      id: "CASH_ON_DELIVERY",
      title: "نقدًا عند الاستلام",
      description: "الدفع عند استلام الطلب",
      icon: Banknote,
    },
    {
      id: "VISA",
      title: "بطاقة ائتمان",
      description: "الدفع عبر بوابة الدفع الإلكتروني",
      icon: CreditCard,
    },
  ];

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8"
      dir="rtl"
    >
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left / Main Forms (8 cols) */}
        <div className="space-y-6 lg:col-span-8">
          {/* Shipping Information Card */}
          <Card>
            <CardHeader className="text-right">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="text-primary h-5 w-5" />
                <span>معلومات الشحن والتوصيل</span>
              </CardTitle>
              <CardDescription>
                أدخل بيانات المستلم والعنوان بدقة لضمان سرعة التوصيل
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Controller
                  name="fullName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field className="space-y-1.5 text-right">
                      <FieldLabel className="flex items-center gap-1.5 text-sm font-medium">
                        <UserIcon className="text-muted-foreground h-4 w-4" />
                        <span>الاسم الكامل</span>
                      </FieldLabel>
                      <FieldContent>
                        <Input placeholder="أدخل اسمك الكامل" {...field} />
                      </FieldContent>
                      <FieldError>{fieldState.error?.message}</FieldError>
                    </Field>
                  )}
                />

                <Controller
                  name="phoneNumber"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field className="space-y-1.5 text-right">
                      <FieldLabel className="flex items-center gap-1.5 text-sm font-medium">
                        <Phone className="text-muted-foreground h-4 w-4" />
                        <span>رقم الهاتف</span>
                      </FieldLabel>
                      <FieldContent>
                        <Input
                          placeholder="مثال: 01xxxxxxxxx"
                          dir="ltr"
                          {...field}
                        />
                      </FieldContent>
                      <FieldError>{fieldState.error?.message}</FieldError>
                    </Field>
                  )}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field className="space-y-1.5 text-right">
                      <FieldLabel className="flex items-center gap-1.5 text-sm font-medium">
                        <Mail className="text-muted-foreground h-4 w-4" />
                        <span>البريد الإلكتروني</span>
                      </FieldLabel>
                      <FieldContent>
                        <Input
                          type="email"
                          placeholder="example@domain.com"
                          dir="ltr"
                          {...field}
                        />
                      </FieldContent>
                      <FieldError>{fieldState.error?.message}</FieldError>
                    </Field>
                  )}
                />

                <Controller
                  name="city"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field className="space-y-1.5 text-right">
                      <FieldLabel className="flex items-center gap-1.5 text-sm font-medium">
                        <MapPin className="text-muted-foreground h-4 w-4" />
                        <span>المدينة / المنطقة</span>
                      </FieldLabel>
                      <FieldContent>
                        <Input placeholder="المدينة أو المنطقة" {...field} />
                      </FieldContent>
                      <FieldError>{fieldState.error?.message}</FieldError>
                    </Field>
                  )}
                />
              </div>

              {/* Address */}
              <Controller
                name="address"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="space-y-1.5 text-right">
                    <FieldLabel className="text-sm font-medium">
                      العنوان التفصيلي (الشارع، رقم المبنى، الشقة)
                    </FieldLabel>
                    <FieldContent>
                      <Textarea
                        placeholder="اكتب العنوان بالتفصيل..."
                        className="min-h-20"
                        {...field}
                      />
                    </FieldContent>
                    <FieldError>{fieldState.error?.message}</FieldError>
                  </Field>
                )}
              />

              {/* Notes */}
              <Controller
                name="notes"
                control={form.control}
                render={({ field }) => (
                  <Field className="space-y-1.5 text-right">
                    <FieldLabel className="text-sm font-medium">
                      ملاحظات التوصيل (اختياري)
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        placeholder="أي تعليمات إضافية لتسليم الطلب..."
                        {...field}
                      />
                    </FieldContent>
                  </Field>
                )}
              />
            </CardContent>
          </Card>

          {/* Payment Method Card */}
          <Card>
            <CardHeader className="text-right">
              <CardTitle className="flex items-center gap-2 text-lg">
                <CreditCard className="text-primary h-5 w-5" />
                <span>طريقة الدفع</span>
              </CardTitle>
              <CardDescription>
                اختر طريقة الدفع المناسبة لإتمام مشترياتك
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const isSelected = selectedPaymentMethod === method.id;
                  return (
                    <div
                      key={method.id}
                      onClick={() =>
                        form.setValue(
                          "paymentMethod",
                          method.id as CheckoutFormValues["paymentMethod"],
                        )
                      }
                      className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-xs"
                          : "border-border hover:border-muted-foreground/40"
                      }`}
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <div
                            className={`rounded-full p-2 ${
                              isSelected
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div
                            className={`h-4 w-4 rounded-full border-2 ${
                              isSelected
                                ? "border-primary bg-primary ring-2 ring-primary/20"
                                : "border-muted-foreground/40"
                            }`}
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">
                            {method.title}
                          </p>
                          <p className="text-muted-foreground mt-1 text-xs">
                            {method.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right / Sidebar (4 cols) */}
        <div className="space-y-6 lg:col-span-4">
          <CheckoutSummary
            subtotal={cartSubtotal(cart.items)}
            onCouponChange={(code) => setCouponCode(code ?? "")}
          />

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full text-base font-bold shadow-md"
          >
            {isSubmitting ? "جاري المعالجة..." : "إتمام الشراء الآن"}
          </Button>
        </div>
      </div>
    </form>
  );
}

function cartSubtotal(
  items: { quantity: number; variantDetails: { newPrice: number } }[],
) {
  return items.reduce(
    (acc, item) => acc + item.variantDetails.newPrice * item.quantity,
    0,
  );
}
