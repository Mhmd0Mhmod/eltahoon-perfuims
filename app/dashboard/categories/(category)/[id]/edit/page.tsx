import { AddCategoryForm } from "@/components/admin/categories/AddCategoryForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryAPI } from "@/lib/api/category";
import { ProductAPI } from "@/lib/api/product";
import { Product } from "@/types/product";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface EditCategoryPageProps {
  params: Promise<{ id: string }>;
}

async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = await params;

  let category;
  try {
    category = await CategoryAPI.getCategoryById(id);
  } catch {
    notFound();
  }

  const products = (await ProductAPI.getAdminProducts({
    displayAll: true,
  })) as Product[];
  const productIds = products
    .filter((p) => p.categories.some((c) => c.id === category.id))
    .map((p) => p.id);

  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/categories">
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">تعديل التصنيف</h1>
          <p className="text-muted-foreground">تعديل بيانات التصنيف: {category.name}</p>
        </div>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>بيانات التصنيف</CardTitle>
          <CardDescription>قم بتعديل المعلومات المطلوبة لتحديث التصنيف</CardDescription>
        </CardHeader>
        <CardContent>
          <AddCategoryForm category={category} products={products} productIds={productIds} />
        </CardContent>
      </Card>
    </div>
  );
}

export default EditCategoryPage;
