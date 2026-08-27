"use client";
import { Market, MarketKey, markets } from "@/config/markets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCookiesNext } from "cookies-next/client";
import { createContext, useContext, useEffect, useState } from "react";
function QueryProvider({ children }: { children: React.ReactNode }) {
  const [query] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 1,
          staleTime: 1000 * 60 * 5, // 5 minutes
        },
      },
    }),
  );
  return <QueryClientProvider client={query}>{children}</QueryClientProvider>;
}

// Market Context
const MarketContext = createContext<{
  market: Market | null;
  changeMarket: (market: MarketKey) => void;
}>({
  market: null,
  changeMarket: () => {},
});
function MarketProvider({ children }: { children: React.ReactNode }) {
  const [currentMarket, setCurrentMarket] = useState<Market | null>(null);
  const { getCookie, setCookie } = useCookiesNext();
  function hanldeMarketChange(marketKey: MarketKey) {
    const selectedMarket = markets[marketKey];
    setCurrentMarket(selectedMarket);
    setCookie("country_code", marketKey, { path: "/" });
  }
  useEffect(() => {
    const countryCode = getCookie("country_code") as MarketKey | undefined;
    if (countryCode && markets[countryCode]) {
      setCurrentMarket(markets[countryCode]);
    } else {
      // Default to Egypt if no cookie is set
      setCurrentMarket(markets.eg);
      setCookie("country_code", "eg", { path: "/" });
    }
  }, [getCookie, setCookie]);
  return (
    <MarketContext
      value={{ market: currentMarket, changeMarket: hanldeMarketChange }}
    >
      {children}
    </MarketContext>
  );
}
function useMarket() {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error("useMarket must be used within a MarketProvider");
  }
  return context;
}

export { MarketProvider, QueryProvider, useMarket };
