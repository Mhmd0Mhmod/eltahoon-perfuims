import { markets } from "@/config/markets";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  value: number,
  currency: string = markets.eg.currency,
  locale: string = markets.eg.locale,
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}
export const idGenerator = () => {
  let i = 0;
  return () => {
    i += 1;
    return i;
  };
};
