import axios from "axios";
import { NextRequest } from "next/server";
const baseURL =
  `${process.env.SPRING_API_URL}/api` ||
  `${process.env.NEXT_PUBLIC_API_URL}/api`;
export const getSpringAPI = function (request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const api = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      Cookie: request.cookies.toString(),
    },
  });
  return api;
};

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
