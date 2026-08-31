import BrandNotFound from "@/components/BrandNotFound";
import { PackageSearch } from "lucide-react";

function NotFound() {
  return (
    <BrandNotFound
      icon={<PackageSearch className="text-primary h-7 w-7" />}
      title="الصفحة غير موجودة"
      description="عذراً، الصفحة التي تبحث عنها غير متاحة أو تم نقلها أو حذفها. يمكنك العودة للبداية لمواصلة رحلتك العطرية."
      backHref="/"
      backLabel="العودة للرئيسية"
      homeHref="/"
      homeLabel="الصفحة الرئيسية"
    />
  );
}
export default NotFound;
