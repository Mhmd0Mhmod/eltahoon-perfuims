import Link from "next/link";
import { ArrowRight, PackageCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ProductForm from "@/features/products/components/ProductForm/ProductForm";
import { getProductById } from "@/app/dashboard/actions";
import ProductPage from "@/features/products/components/ProductPage";

interface ProductEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function ProductEditPage({ params }: ProductEditPageProps) {
  const { id } = await params;

  const productId = Number(id);

  if (!Number.isInteger(productId)) {
    return (
      <main dir="rtl" className="min-h-screen bg-muted/30">
        <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <h1 className="text-xl font-semibold">المنتج غير موجود</h1>

              <p className="mt-2 text-sm text-muted-foreground">
                رقم المنتج غير صالح.
              </p>

              <Button className="mt-6">
                <Link href="/dashboard/products">
                  <ArrowRight className="ml-2 h-4 w-4" />
                  العودة إلى المنتجات
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  const response = await getProductById(productId);

  if (!response.success || !response.data) {
    return (
      <main dir="rtl" className="min-h-screen bg-muted/30">
        <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <h1 className="text-xl font-semibold">تعذر العثور على المنتج</h1>

              <p className="mt-2 text-sm text-muted-foreground">
                المنتج المطلوب غير موجود أو حدث خطأ أثناء تحميل البيانات.
              </p>

              <Button className="mt-6">
                <Link href="/dashboard/products">
                  <ArrowRight className="ml-2 h-4 w-4" />
                  العودة إلى المنتجات
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  const product = response.data.data;

  return <ProductPage product={product} />;
}

export default ProductEditPage;
