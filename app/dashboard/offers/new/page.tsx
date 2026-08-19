import { getProducts } from "@/app/dashboard/actions";
import OfferForm from "@/features/offers/components/OfferForm";

export default async function NewOfferPage() {
  const response = await getProducts({ getAll: true });

  if (!response.success) {
    throw new Error("حدث خطأ أثناء جلب المنتجات");
  }
  const products = response.data.data;
  return (
    <div className="container mx-auto max-w-5xl space-y-6 py-6">
      <div>
        <h1 className="text-2xl font-bold">إنشاء عرض جديد</h1>

        <p className="text-muted-foreground">
          أضف عرضاً جديداً واختر المنتجات التي سيشملها.
        </p>
      </div>

      <OfferForm products={products} />
    </div>
  );
}
