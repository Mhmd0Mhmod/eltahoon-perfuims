import { nextAPI } from "@/lib/nextAPI";
import { ProductSchema } from "../schema";
import { IPagination } from "@/types/pagination";
import { IProduct } from "../types";

export function getAdminProducts({
  params,
  pageParams,
}: {
  params?: Record<string, unknown>;
  pageParams?: number;
} = {}) {
  return nextAPI.get("admin/products", {
    params: {
      ...params,
      page: pageParams,
    },
  });
}

export function getProductFormData(data: ProductSchema) {
  const formData = new FormData();
  formData.append("name", data.name);
  if (data.description) {
    formData.append("description", data.description);
  }
  if (data.categoryIds && data.categoryIds.length > 0) {
    formData.append("categoryIds", JSON.stringify(data.categoryIds));
  }
  if (data.variants && data.variants.length > 0) {
    formData.append("variants", JSON.stringify(data.variants));
  }
  if (data.image) {
    formData.append("image", data.image);
  }
  return formData;
}

export async function getProducts({
  params,
  pageParam,
}: {
  params?: Record<string, unknown>;
  pageParam?: number;
}) {
  return nextAPI.get<IPagination<IProduct>>("/products", {
    params: {
      ...params,
      page: pageParam,
    },
  });
}
