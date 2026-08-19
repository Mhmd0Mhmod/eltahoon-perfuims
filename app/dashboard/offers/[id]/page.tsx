import { getOfferById, getProducts } from "@/app/dashboard/actions";
import OfferForm from "@/features/offers/components/OfferForm";
import { notFound } from "next/navigation";

interface OfferPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditOfferPage({ params }: OfferPageProps) {
  const { id } = await params;

  const [offer, products] = await Promise.all([
    getOfferById(Number(id)),
    getProducts({ getAll: true }),
  ]);

  if (!offer.success) {
    notFound();
  }
  if (!products.success) {
    throw new Error("حدث خطأ أثناء جلب المنتجات");
  }
  const offerData = offer.data.data;
  const productsData = products.data.data;

  return (
    <div className="container mx-auto max-w-5xl space-y-6 py-6">
      <div>
        <h1 className="text-2xl font-bold">تعديل العرض</h1>

        <p className="text-muted-foreground">
          تعديل بيانات العرض والمنتجات المشمولة به.
        </p>
      </div>

      <OfferForm offer={offerData} products={productsData} />
    </div>
  );
}
