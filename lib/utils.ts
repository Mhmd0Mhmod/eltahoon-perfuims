import { markets } from "@/config/markets";
import { IAPIResponse } from "@/types/api";
import { MutationFunctionContext } from "@tanstack/react-query";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
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

export function formatDate(
  dateString?: string | Date | null,
  locale: string = "ar-EG",
) {
  if (!dateString) return "-";
  try {
    const date = typeof dateString === "string" ? new Date(dateString) : dateString;
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch {
    return String(dateString);
  }
}
export const idGenerator = () => {
  let i = 0;
  return () => {
    i += 1;
    return i;
  };
};

export function onSuccessMutation<T>({
  data,
  context,
  successMessage,
  key,
}: {
  data: IAPIResponse<T>;
  context: MutationFunctionContext;
  successMessage: string;
  key?: string;
}) {
  if (data.success) {
    toast.success(data.message || successMessage);
    if (key) {
      context.client.invalidateQueries({
        predicate: (query) =>
          query.queryKey.some(
            (key) => typeof key === "string" && key.toLowerCase().includes(key),
          ),
        type: "active",
      });
    }
  }
}
