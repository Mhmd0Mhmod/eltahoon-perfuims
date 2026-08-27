import { AxiosResponse } from "axios";
import TableDashboardPage, { DashboardPageProps } from "./TableDashboardPage";
import { IPagination } from "@/types/pagination";
import { useInfiniteQuery } from "@/hooks/useMarketQuery";

type QueryParams = {
  params?: Record<string, unknown>;
  page?: number;
};

interface IProps<T> extends Omit<
  DashboardPageProps<T>,
  "rows" | "isLoading" | "hasNextPage" | "isFetchingNextPage" | "fetchNextPage"
> {
  queryFn: (params: QueryParams) => Promise<AxiosResponse<IPagination<T>>>;
  queryKey: string[];
  params?: Record<string, unknown>;
}

function PagiedTableDashboardPage<T>({
  queryFn,
  queryKey,
  params,
  ...rest
}: IProps<T>) {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [...queryKey, params],
      initialPageParam: 0,
      queryFn: ({ pageParam }) =>
        queryFn({
          ...params,
          page: pageParam,
        }),
      getNextPageParam: (lastPage) => {
        if (lastPage.data.last) {
          return undefined;
        }

        return lastPage.data.page + 1;
      },
    });

  const rows = data?.pages.flatMap((page) => page.data.content ?? []) ?? [];

  return (
    <TableDashboardPage<T>
      {...rest}
      rows={rows}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
}

export default PagiedTableDashboardPage;
