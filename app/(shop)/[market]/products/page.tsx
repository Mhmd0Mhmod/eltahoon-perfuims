import { Badge } from "@/components/ui/badge";
import ProductFilters from "@/features/products/components/ProductFilters";
import { ProductsGrid } from "@/features/products/components/ProductsGrid";

export default async function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6" dir="rtl">
      {/* Page Header */}
      <div className="mb-10 text-right">
        <div className="mb-3 flex items-center">
          <Badge className="bg-primary text-primary-foreground font-semibold">
            جميع المنتجات
          </Badge>
        </div>
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight md:text-4xl">
          استكشف <span className="text-primary">عالم العطور الفاخرة</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl text-base md:text-lg">
          اكتشف تشكيلتنا الحصرية من أجود العطور الشرقية والفرنسية المصممة لتناسب
          جميع الأذواق والمناسبات
        </p>
      </div>

      {/* Filters and Products Layout */}
      <div className="grid gap-8 lg:grid-cols-4">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20">
            <ProductFilters />
          </div>
        </aside>

        {/* Products Grid */}
        <main className="lg:col-span-3">
          <ProductsGrid />
        </main>
      </div>
    </div>
  );
}
