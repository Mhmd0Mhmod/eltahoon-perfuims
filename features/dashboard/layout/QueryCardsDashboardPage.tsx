"use client";

import { useQuery } from "@/hooks/useMarketQuery";
import CardsDashboardPage, {
  CardsDashboardPageProps,
} from "./CardsDashboardPage";
interface QueryCardsDashboardPageProps<T> extends Omit<
  CardsDashboardPageProps<T>,
  "items" | "isLoading"
> {
  params?: Record<string, unknown>;
  queryKey: string[];
  queryFn: (params?: Record<string, unknown>) => Promise<{
    data: T[];
  }>;
}
function QueryCardsDashboardPage<T>({
  params,
  queryKey,
  queryFn,
  ...props
}: QueryCardsDashboardPageProps<T>) {
  const { data, isLoading } = useQuery({
    queryKey: ["cards", queryKey, params],
    queryFn: () => queryFn(params),
    enabled: Boolean(queryKey),
  });
  const items: T[] = data?.data ?? [];

  return (
    <CardsDashboardPage<T> {...props} items={items} isLoading={isLoading} />
  );
}
export default QueryCardsDashboardPage;
