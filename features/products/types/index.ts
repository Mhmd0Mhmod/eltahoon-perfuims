import { ICategory } from "@/features/category/types";

interface IOfferDTO {
  id: number | string;
  title: string;
  description: string;
  discountType?: string;
  discountValue?: number;
}

interface IProductVariant {
  id: number;
  name: string;
  imageUrl?: string;
  size: number;
  unit: string;
  oldPrice?: number;
  newPrice: number;
  isAvailable: boolean;
  offerResponseDTO?: IOfferDTO | null;
  createdAt?: string;
  updatedAt?: string;
}

interface IProduct {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  categories: Pick<ICategory, "id" | "name">[];
  createdAt: string;
  updatedAt: string;
  countryCode?: string;
  variants: IProductVariant[];
}

export type { IProduct, IProductVariant, IOfferDTO };
