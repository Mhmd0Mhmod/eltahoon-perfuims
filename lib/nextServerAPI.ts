import axios from "axios";
import { cookies } from "next/headers";
const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;
export const getNextServerAPI = async () => {
  const cookeisStore = await cookies();
  const allCookies = cookeisStore.getAll();
  return axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Cookie: allCookies
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; "),
    },
  });
};
