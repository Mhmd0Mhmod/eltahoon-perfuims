import { useEffect, useState } from "react";
import useCookies from "@/hooks/useCookies";
import { Market } from "@/config/markets";
export function useCountryCode() {
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const { getCookie } = useCookies();

  useEffect(() => {
    const code = getCookie("countryCode");
    if (code) {
      setCountryCode(code);
    }
  }, [getCookie]);
  return countryCode?.toLowerCase() as Market;
}
