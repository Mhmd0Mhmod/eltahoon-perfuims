"use client";

import { markets } from "@/config/markets";
import useCookies from "@/hooks/useCookies";
import { formatCurrency as formatCurrencyFunc } from "@/lib/utils";
function FormatCurrency({
  value,
  currencyCode,
}: {
  value: number | string;
  currencyCode?: string;
}) {
  const { getCookie } = useCookies();
  const countryCode = getCookie("country_code");
  const code = currencyCode || countryCode;
  const configMarket = markets[code as keyof typeof markets] || markets.eg;
  return formatCurrencyFunc(
    Number(value),
    configMarket.currency,
    configMarket.locale,
  );
}
export default FormatCurrency;
