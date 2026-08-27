import { AxiosResponse } from "axios";
import TableDashboardPage, { DashboardPageProps } from "./TableDashboardPage";
import { IPagination } from "@/types/pagination";
import { useInfiniteQuery, useQuery } from "@/hooks/useMarketQuery";

interface IProps<T, P = Record<string, unknown>> extends Omit<
  DashboardPageProps<T>,
  "rows" | "isLoading" | "hasNextPage" | "isFetchingNextPage" | "fetchNextPage"
> {
  queryFn: (params?: P) => Promise<AxiosResponse<T[]>>;
  queryKey: string[];
  params?: P;
}

function QueryTableDashboardPage<T>({
  queryFn,
  queryKey,
  params,
  ...rest
}: IProps<T>) {
  const { data = [], isLoading } = useQuery({
    queryKey: [...queryKey, params],
    queryFn: queryFn,
    select: (data) => data.data,
  });

  return <TableDashboardPage<T> {...rest} rows={data} isLoading={isLoading} />;
}

export default QueryTableDashboardPage;
