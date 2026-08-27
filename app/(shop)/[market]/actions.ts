"use server";

import { ICategory } from "@/features/category/types";
import { IProduct } from "@/features/products/types";
import { getNextServerAPI } from "@/lib/nextServerAPI";
import { IPagination } from "@/types/pagination";

export async function getCategories() {
  try {
    const api = await getNextServerAPI();
    const categories = await api.get<ICategory[]>("/categories");
    return categories.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getProducts() {
  try {
    const api = await getNextServerAPI();
    const products = await api.get<IPagination<IProduct>>("/products");
    return products.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
