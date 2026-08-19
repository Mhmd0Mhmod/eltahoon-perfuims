export const Roles = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;
export type Roles = (typeof Roles)[keyof typeof Roles];
