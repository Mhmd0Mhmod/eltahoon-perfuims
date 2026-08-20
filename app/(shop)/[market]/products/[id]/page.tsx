import { getShopProductById, getShopProducts } from "@/app/actions";
import { Market, markets } from "@/config/markets";
import { ProductDetails } from "@/features/products/components/ProductDetails";
import { RelatedProducts } from "@/features/products/components/RelatedProducts";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ market: string; id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { market, id } = await params;
  const currentMarket = markets[market.toLowerCase() as Market];

  if (!currentMarket) {
    notFound();
  }

  const [product, allProducts] = await Promise.all([
    getShopProductById(id),
    getShopProducts(),
  ]);

  if (!product) {
    notFound();
  }

  const relatedProducts = allProducts.filter((p) => p.id !== product.id);

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12" dir="rtl">
      {/* Product Main Details */}
      <ProductDetails product={product} market={currentMarket} />

      {/* Suggested / Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 border-t pt-12">
          <RelatedProducts products={relatedProducts} market={currentMarket} />
        </div>
      )}
    </div>
  );
}
