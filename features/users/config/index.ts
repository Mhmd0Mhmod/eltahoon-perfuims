import { ShieldCheck, User } from "lucide-react";

export const ROLE_CONFIG = {
  ADMIN: {
    label: "مدير",
    variant: "default" as const,
    icon: ShieldCheck,
    bgColor: "bg-teal-500/10 text-teal-600",
  },

  CUSTOMER: {
    label: "مستخدم",
    variant: "secondary" as const,
    icon: User,
    bgColor: "bg-gray-500/10 text-gray-600",
  },
} as const;
