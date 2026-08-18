import axios from "axios";
import { NextRequest } from "next/server";
const baseURL =
  `${process.env.SPRING_API_URL}/api` || "http://localhost:3000/api";
export const getSpringAPI = function (request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const api = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      Cookie: request.cookies
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; "),
    },
  });
  return api;
};
