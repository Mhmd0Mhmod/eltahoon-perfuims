import { useMarket } from "@/app/providers";
import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  UseQueryOptions,
  useInfiniteQuery as useReactInfiniteQuery,
  useQuery as useReactQuery,
} from "@tanstack/react-query";

export function useQuery<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
>(options: UseQueryOptions<TQueryFnData, TError, TData, QueryKey>) {
  const { market } = useMarket();
  const queryKey: QueryKey = [
    ...(market?.code ? [market.code] : []),
    ...options.queryKey,
  ];

  return useReactQuery({
    ...options,
    queryKey,
    enabled: market?.code ? options.enabled : false,
  });
}

export function useInfiniteQuery<
  TQueryFnData = unknown,
  TError = Error,
  TPageParam = unknown,
  TData = InfiniteData<TQueryFnData, TPageParam>,
>(
  options: UseInfiniteQueryOptions<
    TQueryFnData,
    TError,
    TData,
    QueryKey,
    TPageParam
  >,
) {
  const { market } = useMarket();

  const queryKey: QueryKey = [
    ...(market?.code ? [market.code] : []),
    ...(options.queryKey ?? []),
  ];

  return useReactInfiniteQuery({
    ...options,
    queryKey,
    enabled: market?.code ? options.enabled : false,
  });
}
