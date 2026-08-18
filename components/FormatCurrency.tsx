"use client";

import { markets } from "@/config/markets";
import useCookies from "@/hooks/useCookies";
import { formatCurrency as formatCurrencyFunc } from "@/lib/utils";
function FormatCurrency({ value }: { value: number | string }) {
  const { getCookie } = useCookies();
  const countryCode = getCookie("country_code");
  const configMarket =
    markets[countryCode as keyof typeof markets] || markets.eg;
  return formatCurrencyFunc(
    Number(value),
    configMarket.currency,
    configMarket.locale,
  );
}
export default FormatCurrency;
