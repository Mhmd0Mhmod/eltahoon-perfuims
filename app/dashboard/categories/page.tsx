"use client";

import { CategoryCard } from "@/features/category/components/CategoryCard";
import { CategoryForm } from "@/features/category/components/CategoryForm/CategoryForm";
import { getAdminCategories } from "@/features/category/services";
import { ICategory } from "@/features/category/types";
import CardsDashboardPage from "@/features/dashboard/layout/CardsDashboardPage";
import { FolderTree } from "lucide-react";

function CategoriesPage() {
  return (
    <CardsDashboardPage<ICategory>
      title="التصنيفات"
      description="إدارة تصنيفات المنتجات"
      queryKey="categories"
      queryFn={getAdminCategories}
      renderCard={(category) => <CategoryCard category={category} />}
      form={{
        title: "إضافة تصنيف",
        description: "أضف تصنيف جديد للمنتجات",
        component: <CategoryForm />,
      }}
      emptyState={
        <div className="flex flex-col items-center justify-center py-12">
          <FolderTree className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="text-lg font-semibold">لا توجد تصنيفات</h3>
          <p className="text-sm text-muted-foreground">
            ابدأ بإضافة تصنيف جديد باستخدام الزر أعلاه
          </p>
        </div>
      }
      gridColumns={3}
    />
  );
}

export default CategoriesPage;
