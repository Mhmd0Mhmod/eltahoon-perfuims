import { Category } from "./category";
import { Offer } from "./offer";
import { PaginationParams } from "./pageable";

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  categories: Pick<Category, "id" | "name">[];
  createdAt: string;
  updatedAt: string;
  countryCode: string;
  variants: ProductVariant[];
}

interface ProductVariant {
  id: number;
  name: string;
  imageUrl: string;
  size: number;
  unit: string;
  oldPrice: number;
  newPrice: number;
  isAvailable: true;
  //   offerResponseDTO: Pick<
  //     Offer,
  //     "id" | "title" | "description" | "discountType" | "discountValue"
  //   > | null;
  createdAt: string;
  updatedAt: string;
}

export type { Product, ProductVariant };
