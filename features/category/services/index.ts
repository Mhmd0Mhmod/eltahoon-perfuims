import { nextAPI } from "@/lib/nextAPI";
import { ICategory } from "../types";

export async function getAdminCategories() {
  return nextAPI.get<ICategory[]>("/admin/categories");
}
export async function getCategories() {
  return nextAPI.get<ICategory[]>("/categories");
}
