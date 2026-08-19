"use server";

import { IOrder } from "@/features/orders/types";
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
