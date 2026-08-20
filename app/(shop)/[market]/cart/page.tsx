import { MarketKey, markets } from "@/config/markets";
import { CartView } from "@/features/cart";
import { notFound } from "next/navigation";

interface CartPageProps {
  params: Promise<{ market: string }>;
}

export default async function CartPage({ params }: CartPageProps) {
  const { market } = await params;
  const currentMarket = markets[market.toLowerCase() as MarketKey];

  if (!currentMarket) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12" dir="rtl">
      <CartView market={currentMarket} marketKey={market} />
    </div>
  );
}
