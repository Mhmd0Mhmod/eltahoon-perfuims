"use client";

import CardsDashboardPage from "@/features/dashboard/layout/CardsDashboardPage";
import SizeCard from "@/features/size/components/SizeCard";
import SizeForm from "@/features/size/components/SizeForm";
import { getAdminSizes } from "@/features/size/services";
import { ISize } from "@/features/size/types";
import { Package } from "lucide-react";

function SizesPage() {
  return (
    <CardsDashboardPage<ISize>
      title="أحجام الزجاجات"
      description="إدارة أحجام زجاجات العطور"
      queryKey="sizes"
      queryFn={getAdminSizes}
      renderCard={(size) => <SizeCard size={size} />}
      form={{
        title: "إضافة حجم جديد",
        description: "أدخل بيانات الحجم الجديد هنا. انقر حفظ عند الانتهاء.",
        component: <SizeForm />,
      }}
      emptyState={
        <div className="flex flex-col items-center justify-center py-12">
          <Package className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="text-lg font-semibold">لا توجد أحجام</h3>
          <p className="text-sm text-muted-foreground">
            ابدأ بإضافة حجم جديد باستخدام الزر أعلاه
          </p>
        </div>
      }
      gridColumns={3}
    />
  );
}

export default SizesPage;
