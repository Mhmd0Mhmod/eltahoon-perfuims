"use server";

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
