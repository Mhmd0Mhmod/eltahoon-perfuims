import BrandNotFound from "@/components/BrandNotFound";
import { FileX } from "lucide-react";

export default function OfferNotFound() {
  return (
    <BrandNotFound
      icon={<FileX className="text-primary h-7 w-7" />}
      title="العرض غير موجود"
      description="عذراً، العرض الذي تبحث عنه غير متوفر أو تم حذفه."
      backHref="/dashboard/offers"
      backLabel="العودة للعروض"
      homeHref="/dashboard"
      homeLabel="لوحة التحكم"
    />
  );
}
