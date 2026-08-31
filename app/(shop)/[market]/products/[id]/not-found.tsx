import BrandNotFound from "@/components/BrandNotFound";
import { SearchX } from "lucide-react";

export default function ProductNotFound() {
  return (
    <BrandNotFound
      icon={<SearchX className="text-primary h-7 w-7" />}
      title="المنتج غير موجود"
      description="عذراً، المنتج الذي تبحث عنه غير متوفر أو تم حذفه من المتجر."
      backHref="/products"
      backLabel="العودة للمنتجات"
      homeHref="/"
      homeLabel="الصفحة الرئيسية"
    />
  );
}
