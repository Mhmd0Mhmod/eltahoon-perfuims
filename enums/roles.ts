export const Roles = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
} as const;
export type Roles = (typeof Roles)[keyof typeof Roles];
