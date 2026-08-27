import { nextAPI } from "@/lib/nextAPI";
import { IPagination } from "@/types/pagination";
import { ProductSchema } from "../schema";
import { IProduct } from "../types";

export function getAdminProducts({
  params,
  page,
}: {
  params?: Record<string, unknown>;
  page?: number;
} = {}) {
  return nextAPI.get("admin/products", {
    params: {
      ...params,
      page,
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
  page,
}: {
  params?: Record<string, unknown>;
  page?: number;
}) {
  return nextAPI.get<IPagination<IProduct>>("/products", {
    params: {
      ...params,
      page,
    },
  });
}
