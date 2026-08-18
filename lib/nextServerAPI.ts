import axios from "axios";
import { cookies } from "next/headers";
const baseURL = "http://localhost:3000/api";
export const nextServerAPI = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
nextServerAPI.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers.Cookie = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
  return config;
});
