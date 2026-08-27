import { MarketKey } from "@/config/markets";
import { IProductVariant } from "@/features/products/types";

interface CartItem {
  id: number;
  userId: number;
  productId: number;
  countryName: string;
  countryCode: MarketKey;
  variantDetails: IProductVariant;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export type { CartItem };
