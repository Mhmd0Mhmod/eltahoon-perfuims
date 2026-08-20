"use server";

import { ICategory } from "@/features/category/types";
import { IOrder } from "@/features/orders/types";
import { IProduct } from "@/features/products/types";
import { nextServerAPI } from "@/lib/nextServerAPI";
import { User } from "@/types/user";

export async function getCurrentUser() {
  try {
    const response = await nextServerAPI.get<User>("users/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

export async function getUserOrderById(id: string) {
  try {
    const response = await nextServerAPI.get<IOrder>(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order with ID ${id}:`, error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function getShopProducts() {
  try {
    const response = await nextServerAPI.get<IProduct[]>("/products");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching shop products:", error);
    return [];
  }
}

export async function getShopProductById(id: string | number) {
  try {
    const response = await nextServerAPI.get<IProduct>(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
}

export async function getShopCategories() {
  try {
    const response = await nextServerAPI.get<ICategory[]>("/categories");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching shop categories:", error);
    return [];
  }
}
