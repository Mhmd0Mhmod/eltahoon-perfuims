"use client";
import { markets } from "@/config/markets";
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
  market: string | null;
  setMarket: (market: string) => void;
}>({
  market: null,
  setMarket: () => {},
});
function MarketProvider({ children }: { children: React.ReactNode }) {
  const [currentMarket, setCurrentMarket] = useState("");
  const queryClient = useQueryClient();
  const router = useRouter();
  const setMarket = (market: string) => {
    setCurrentMarket(market);
    cookieStore.set("country_code", market);
    queryClient.invalidateQueries();
    router.refresh();
  };
  useEffect(() => {
    cookieStore.get("country_code").then((cookie) => {
      if (cookie && cookie.value) {
        setCurrentMarket(cookie.value);
      } else {
        setCurrentMarket(markets.eg.code);
      }
    });
  }, []);
  return (
    <MarketContext value={{ market: currentMarket, setMarket }}>
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
