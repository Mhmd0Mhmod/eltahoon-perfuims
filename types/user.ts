import { Roles } from "@/enums/roles";

export interface User {
  id: number;
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string;
  address: string;
  role: Roles;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
}
export interface Session {
  user: User;
  token: string | undefined;
}
