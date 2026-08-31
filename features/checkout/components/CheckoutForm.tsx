"use client";

import { createOrderAction } from "@/app/(shop)/[market]/actions";
import { Button, Button as LinkButton } from "@/components/ui/button";
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
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCartStore } from "@/stores/useCartStore";
import { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Banknote,
  CreditCard,
  Mail,
  MapPin,
  Phone,
  User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { CheckoutFormValues, checkoutSchema } from "../types";
import { CheckoutSummary } from "./CheckoutSummary";
import { PAYMENT_METHOD_CONFIG } from "@/features/payments/config";
import { useMutation } from "@tanstack/react-query";

export function CheckoutForm() {
  const router = useRouter();
  const {
    isAuthenticated,
    isLoading: authLoading,
    userProfile: user,
  } = useAuth();
  const cart = useCartStore((state) => state);
  const [couponCode, setCouponCode] = useState<string>("");
  const { mutate: createOrder, isPending: isSubmitting } = useMutation({
    mutationKey: ["createOrder"],
    mutationFn: createOrderAction,
  });
  const {} = useMutation({
    mutationKey: ["applyCoode"],
  });
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
      paymentMethodId: PAYMENT_METHOD_CONFIG.CASH_ON_DELIVERY.id,
    },
  });

  const selectedPaymentMethod = useWatch({
    control: form.control,
    name: "paymentMethodId",
    defaultValue: PAYMENT_METHOD_CONFIG.CASH_ON_DELIVERY.id,
  });

  function onSubmit(data: CheckoutFormValues) {
    if (cart.items.length === 0) {
      toast.error("سلة التسوق فارغة. يرجى إضافة منتجات قبل إتمام الشراء.");
      return;
    }

    const orderData = {
      ...data,
      couponCode: couponCode || null,
      shippingAddress: `${data.address}, ${data.city}`,
    };

    createOrder(orderData, {
      onSuccess: (response) => {
        if (response.success) {
          toast.success(response.message);
          cart.clearCart();
          router.push(`/orders/${response.data.orderId}`);
        } else {
          toast.error(response.message);
        }
      },
      onError: (error) => {
        console.error("Error creating order:", error);
        toast.error("حدث خطأ أثناء إتمام الطلب، يرجى المحاولة مرة أخرى");
      },
    });
  }
  useEffect(() => {
    if (user) {
      form.reset({
        fullName: user.fullName ?? "",
        email: user.email ?? "",
        phoneNumber: user.phoneNumber ?? "",
        address: user.address ?? "",
      });
    }
  }, [user, form]);
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

  console.log(form.formState.errors);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                {Object.values(PAYMENT_METHOD_CONFIG).map((method) => {
                  const Icon = method.icon;
                  const isSelected = selectedPaymentMethod === method.id;
                  return (
                    <div
                      key={method.id}
                      onClick={() =>
                        form.setValue("paymentMethodId", method.id)
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
                            {method.label}
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
