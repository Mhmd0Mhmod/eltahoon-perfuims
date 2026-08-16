import { CategoryCard } from "@/components/admin/categories/CategoryCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryAPI } from "@/lib/api/category";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function CategoriesPage() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">التصنيفات</h1>
          <p className="text-muted-foreground">إدارة تصنيفات المنتجات</p>
        </div>
        <Button asChild>
          <Link href="/admin/categories/new">
            <Plus className="mr-2 h-4 w-4" />
            إضافة تصنيف
          </Link>
        </Button>
      </div>

      <Suspense
        fallback={
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        }
      >
        <CategoriesList />
      </Suspense>
    </div>
  );
}

async function CategoriesList() {
  const categories = await CategoryAPI.getAdminCategories();
  if (categories.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>لا توجد تصنيفات</CardTitle>
          <CardDescription>ابدأ بإضافة تصنيف جديد باستخدام الزر أعلاه</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
export default CategoriesPage;
