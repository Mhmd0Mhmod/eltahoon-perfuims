// import { ICategory } from "./Icategory";

import { ICategory } from "@/features/categoy/types";

interface IProduct {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  categories: Pick<ICategory, "id" | "name">[];
  createdAt: string;
  updatedAt: string;
  countryCode: string;
  variants: IProductVariant[];
}

interface IProductVariant {
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

export type { IProduct, IProductVariant };
