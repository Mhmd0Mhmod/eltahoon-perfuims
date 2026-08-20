import { MarketKey } from "@/config/markets";
import useCookies from "@/hooks/useCookies";
import { useEffect, useState } from "react";
export function useCountryCode() {
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const { getCookie } = useCookies();

  useEffect(() => {
    const code = getCookie("countryCode");
    if (code) {
      setCountryCode(code);
    }
  }, [getCookie]);
  return countryCode?.toLowerCase() as MarketKey;
}
