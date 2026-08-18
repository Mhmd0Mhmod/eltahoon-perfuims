import axios from "axios";
export const nextAPI = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
