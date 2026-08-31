import BrandNotFound from "@/components/BrandNotFound";
import { UserX } from "lucide-react";

export default function CustomerNotFound() {
  return (
    <BrandNotFound
      icon={<UserX className="text-primary h-7 w-7" />}
      title="العميل غير موجود"
      description="عذراً، العميل الذي تبحث عنه غير متوفر في النظام أو تم حذفه."
      backHref="/dashboard/customers"
      backLabel="العودة للعملاء"
      homeHref="/dashboard"
      homeLabel="لوحة التحكم"
    />
  );
}
