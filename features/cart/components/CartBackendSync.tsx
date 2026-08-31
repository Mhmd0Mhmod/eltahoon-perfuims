"use client";

import { useBackendCart } from "@/features/cart/hooks/useBackendCart";

export function CartBackendSync() {
  useBackendCart();
  return null;
}
