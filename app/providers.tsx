"use client";
import { Market, MarketKey, markets } from "@/config/markets";
import { useCountryCode } from "@/hooks/useCountryCode";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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
  const countryCode = useCountryCode();
  const router = useRouter();
  useEffect(() => {
    if (countryCode) {
      const market = markets[countryCode] || markets.eg;
      setCurrentMarket(market);
    }
  }, [countryCode]);
  function changeMarket(marketKey: MarketKey) {
    const market = markets[marketKey] || markets.eg;
    setCurrentMarket(market);
    router.replace(`/${marketKey}`);
  }
  return (
    <MarketContext value={{ market: currentMarket, changeMarket }}>
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

export { QueryProvider, MarketProvider, useMarket };
