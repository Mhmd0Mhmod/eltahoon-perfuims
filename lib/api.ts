import axios from "axios";
import { cookies } from "next/headers";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  paramsSerializer: {
    indexes: null,
  },
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (token?.value) {
    config.headers.Authorization = `Bearer ${token.value}`;
  }
  return config;
});
