"use client";

import { markets } from "@/config/markets";
import Cookies from "js-cookie";
import { formatCurrency as formatCurrencyFunc } from "@/lib/utils";
function FormatCurrency({ value }: { value: number | string }) {
  const code = Cookies.get("countryCode");
  const configMarket = markets[code as keyof typeof markets] || markets.eg;
  return formatCurrencyFunc(
    Number(value),
    configMarket.currency,
    configMarket.locale,
  );
}
export default FormatCurrency;
