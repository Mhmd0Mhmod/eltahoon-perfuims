import BrandNotFound from "@/components/BrandNotFound";
import { FileX } from "lucide-react";

export default function OrderNotFound() {
  return (
    <BrandNotFound
      icon={<FileX className="text-primary h-7 w-7" />}
      title="الطلب غير موجود"
      description="عذراً، الطلب الذي تبحث عنه غير متوفر في النظام أو تم حذفه."
      backHref="/dashboard/orders"
      backLabel="العودة للطلبات"
      homeHref="/dashboard"
      homeLabel="لوحة التحكم"
    />
  );
}
