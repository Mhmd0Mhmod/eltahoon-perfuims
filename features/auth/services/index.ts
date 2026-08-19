import { nextAPI } from "@/lib/nextAPI";
import { User } from "@/types/user";

export async function fetchUserProfile() {
  const response = await nextAPI.get<User>("users/me");
  const { data } = response;
  return data;
}
