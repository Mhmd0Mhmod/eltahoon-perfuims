import { api } from "@/lib/api";

export function getProducts() {
  return api.get("/products");
}
