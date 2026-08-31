import { nextAPI } from "@/lib/nextAPI";
import { CartItem } from "../types";

export function getBackendCart() {
  return nextAPI.get<CartItem[]>("/cart");
}

export function addToBackendCart(data: {
  productVariantId: number;
  quantity: number;
}) {
  return nextAPI.post<CartItem>("/cart", data);
}

export function updateBackendCartItem(
  cartItemId: number,
  data: { productVariantId: number; quantity: number },
) {
  return nextAPI.patch<CartItem>(`/cart/${cartItemId}`, data);
}

export function removeBackendCartItem(cartItemId: number) {
  return nextAPI.delete(`/cart/${cartItemId}`);
}

export function clearBackendCart() {
  return nextAPI.delete("/cart");
}
