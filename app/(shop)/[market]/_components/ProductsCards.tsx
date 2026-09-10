import { MarketKey } from "@/config/markets";
import { ProductCard } from "@/features/products/components/ProductCard";
import { IProduct } from "@/features/products/types";
import { api } from "@/lib/springAPI";
import { IPagination } from "@/types/pagination";



async function ProductsCards({ market }: { market: MarketKey }) {
  let products: IProduct[] = [];
  try {
    const response = await api.get<IPagination<IProduct>>("/products", {
      headers: {
        "Cookie": `country_code=${market}`,
      },
    });
    products = response.data.content;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
  return products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
}
export default ProductsCards;
