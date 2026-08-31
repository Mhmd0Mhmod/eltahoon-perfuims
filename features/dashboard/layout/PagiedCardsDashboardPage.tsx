"use client";

import { useInfiniteQuery, useQuery } from "@/hooks/useMarketQuery";
import { IPagination } from "@/types/pagination";
import CardsDashboardPage, {
  CardsDashboardPageProps,
} from "./CardsDashboardPage";
import { AxiosResponse } from "axios";
interface PagiedCardsDashboardPageProps<T> extends Omit<
  CardsDashboardPageProps<T>,
  "items" | "isLoading"
> {
  params?: Record<string, unknown>;
  queryKey: string[];
  queryFn: (
    params?: Record<string, unknown>,
    page?: number,
  ) => Promise<AxiosResponse<IPagination<T>>>;
}
function PagiedCardsDashboardPage<T>({
  params,
  queryKey,
  queryFn,
  ...props
}: PagiedCardsDashboardPageProps<T>) {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["cards", queryKey, params],
      queryFn: ({ pageParam }) => queryFn({ params, page: pageParam }),
      enabled: Boolean(queryKey),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (!lastPage.data.last) return lastPage.data.page + 1;

        return undefined;
      },
    });
  const items: T[] = data?.pages.flatMap((page) => page.data.content) ?? [];

  return (
    <CardsDashboardPage<T>
      {...props}
      items={items}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
}
export default PagiedCardsDashboardPage;
