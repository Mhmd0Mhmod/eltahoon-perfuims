import BrandNotFound from "@/components/BrandNotFound";
import { FileX } from "lucide-react";

export default function AccountOrderNotFound() {
  return (
    <BrandNotFound
      icon={<FileX className="text-primary h-7 w-7" />}
      title="الطلب غير موجود"
      description="عذراً، الطلب الذي تبحث عنه غير متوفر أو تم حذفه."
      backHref="/account/orders"
      backLabel="العودة للطلبات"
      homeHref="/account"
      homeLabel="حسابي"
    />
  );
}
