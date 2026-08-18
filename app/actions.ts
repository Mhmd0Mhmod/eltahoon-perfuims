"use server";

import { cookies } from "next/headers";

export async function getCookies(key?: string) {
  const cookiesStore = await cookies();
  if (key) return cookiesStore.get(key);
  return cookiesStore.getAll();
}
