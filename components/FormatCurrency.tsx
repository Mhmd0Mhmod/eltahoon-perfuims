"use client";

import { MarketKey, markets } from "@/config/markets";
import { formatCurrency as formatCurrencyFunc } from "@/lib/utils";
import { getCookie } from "cookies-next/client";
function FormatCurrency({
  value,
  marketKey,
}: {
  value: number | string;
  marketKey?: MarketKey;
}) {
  const countryCode = getCookie("country_code") as MarketKey;
  const code = marketKey || countryCode;
  const configMarket = markets[code] || markets.eg;
  return formatCurrencyFunc(
    Number(value),
    configMarket.currency,
    configMarket.locale,
  );
}
export default FormatCurrency;
