"use client";

import Link from "next/link";
import { ArrowRight, PackageCheck, PackagePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ProductForm from "./ProductForm/ProductForm";
import { IProduct } from "../types";

interface ProductPageProps {
  product?: IProduct;
}

function ProductPage({ product }: ProductPageProps) {
  const isEditMode = Boolean(product);

  return (
    <main dir="rtl" className="min-h-screen bg-muted/30">
      <div className="container mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Back */}
        <div>
          <Button variant="ghost" className="gap-2">
            <Link
              href="/dashboard/products"
              className="flex items-center gap-2"
            >
              <ArrowRight className="h-4 w-4" />
              العودة إلى المنتجات
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              {isEditMode ? (
                <PackageCheck className="h-6 w-6" />
              ) : (
                <PackagePlus className="h-6 w-6" />
              )}
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {isEditMode ? "تعديل المنتج" : "إضافة منتج جديد"}
              </h1>

              <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                {isEditMode
                  ? "قم بتعديل بيانات المنتج والأحجام والأسعار والتصنيفات."
                  : "أضف منتجًا جديدًا إلى المتجر مع تحديد التصنيفات والأحجام والأسعار."}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* Form */}
          <Card className="overflow-hidden bg-background">
            <CardHeader className="border-b ">
              <CardTitle>
                {isEditMode ? "بيانات المنتج" : "بيانات المنتج الجديد"}
              </CardTitle>

              <CardDescription>
                {isEditMode
                  ? "قم بتحديث بيانات المنتج ثم احفظ التغييرات."
                  : "أدخل المعلومات الأساسية للمنتج ثم أضف الأحجام والأسعار المتاحة."}
              </CardDescription>
            </CardHeader>

            <CardContent className="bg-background p-4 sm:p-6">
              <ProductForm product={product} />
            </CardContent>
          </Card>

          {/* Sidebar */}
          <ProductSidebar product={product} />
        </div>
      </div>
    </main>
  );
}

function ProductSidebar({ product }: { product?: IProduct }) {
  if (product) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">معلومات المنتج</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 text-sm">
            <div>
              <p className="text-muted-foreground">اسم المنتج</p>

              <p className="mt-1 font-medium">{product.name}</p>
            </div>

            <div>
              <p className="text-muted-foreground">عدد التصنيفات</p>

              <p className="mt-1 font-medium">
                {product.categories?.length ?? 0}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">عدد الأحجام</p>

              <p className="mt-1 font-medium">
                {product.variants?.length ?? 0}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">تنبيه</CardTitle>
          </CardHeader>

          <CardContent className="text-sm leading-6 text-muted-foreground">
            تأكد من مراجعة الأسعار والأحجام وحالة توفر المنتج قبل حفظ التعديلات.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">نصائح لإضافة المنتج</CardTitle>
        </CardHeader>

        <CardContent>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
              <span>استخدم اسمًا واضحًا ومميزًا للمنتج ليسهل العثور عليه.</span>
            </li>

            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
              <span>أضف وصفًا مختصرًا يوضح أهم خصائص المنتج.</span>
            </li>

            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
              <span>اختر جميع التصنيفات المناسبة للمنتج.</span>
            </li>

            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
              <span>أضف الأحجام المتاحة وحدد سعر كل حجم.</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg">قبل الحفظ</CardTitle>
        </CardHeader>

        <CardContent className="text-sm leading-6 text-muted-foreground">
          تأكد من مراجعة اسم المنتج والتصنيفات والأحجام والأسعار قبل الضغط على
          زر إضافة المنتج.
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductPage;
