"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { Loader2, Plus } from "lucide-react";
import Link from "next/link";
import { type ReactNode } from "react";

import Dialog from "@/components/Dialog";
import StatsCard from "@/components/StatsCard";
import TableSkeleton from "@/components/TableSkeleton";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import useCookies from "@/hooks/useCookies";
import { idGenerator } from "@/lib/utils";
import type { Column, Description, StatsCardData, Title } from "@/types";
import type { IPagination } from "@/types/pagination";

type TableConfig = Title & Description;

type FormConfig =
  | (Title &
      Description & {
        component: ReactNode;
      })
  | (Title & {
      to: string;
    });

type PaginatedResponse<T> = AxiosResponse<IPagination<T>>;
type NonPaginatedResponse<T> = AxiosResponse<T[]>;

type QueryResponse<T> = PaginatedResponse<T> | NonPaginatedResponse<T>;

interface DashboardPageContentProps<T, P = Record<string, unknown>> {
  title: string;
  description: string;
  params?: P;
  stats?: StatsCardData[];
  columns: Column<T>[];
  table: TableConfig;
  form?: FormConfig;
  emptyState?: ReactNode;
  queryKey: string;
  isPaginated?: boolean;
  queryFn: ({
    params,
    pageParam,
  }: {
    params?: P;
    pageParam?: number;
  }) => Promise<QueryResponse<T>>;
}
const generateId = idGenerator();
function TableDashboardPage<T, P = Record<string, unknown>>({
  title,
  description,
  table,
  form,
  params,
  stats,
  columns,
  queryFn,
  emptyState,
  queryKey,
  isPaginated = true,
}: DashboardPageContentProps<T, P>) {
  const { getCookie } = useCookies();
  const countryCode = getCookie("country_code");

  const infiniteQuery = useInfiniteQuery({
    queryKey: ["infinite", countryCode, queryKey, params],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => queryFn({ params, pageParam }),
    getNextPageParam: (lastPage) => {
      if (!isPaginated || !isPaginatedResponse(lastPage.data)) {
        return undefined;
      }
      return lastPage.data.last ? undefined : lastPage.data.page + 1;
    },
    enabled: !!countryCode && !!queryKey && isPaginated,
  });

  const query = useQuery({
    queryKey: ["Query", countryCode, queryKey, params],
    queryFn: () => queryFn({ params }),
    enabled: !!countryCode && !!queryKey && !isPaginated,
  });

  const isLoading = isPaginated ? infiniteQuery.isLoading : query.isLoading;
  const isFetchingNextPage = isPaginated
    ? infiniteQuery.isFetchingNextPage
    : false;
  const hasNextPage = isPaginated ? infiniteQuery.hasNextPage : false;
  const fetchNextPage = infiniteQuery.fetchNextPage;

  const rows: T[] = isPaginated
    ? (infiniteQuery.data?.pages.flatMap((page) => {
        if (!isPaginatedResponse(page.data)) {
          return [];
        }
        return page.data.content;
      }) ?? [])
    : query.data?.data && Array.isArray(query.data.data)
      ? query.data.data
      : [];

  const renderCell = (row: T, column: Column<T>): ReactNode => {
    if (column.render) {
      return column.render(row);
    }
    if (column.valueFormatter) {
      return column.valueFormatter(row);
    }

    if (column.header) {
      const value = row[column.header];
      if (value === null || value === undefined) {
        return "-";
      }
      return String(value);
    }

    return "-";
  };

  return (
    <div dir="rtl" className="container mx-auto w-full space-y-6 p-4 sm:p-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            {description}
          </p>
        </div>

        {form && "to" in form && (
          <Button className="w-full sm:w-auto">
            <Link href={form.to} className="flex items-center justify-center">
              <Plus className="ml-2 h-4 w-4" />
              {form.title}
            </Link>
          </Button>
        )}

        {form && "component" in form && (
          <Dialog title={form.title} description={form.description}>
            {form.component}
          </Dialog>
        )}
      </div>

      {/* Stats */}
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          {stats.map((stat) => (
            <StatsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              icon={stat.icon}
            />
          ))}
        </div>
      )}

      {/* Table Card */}
      <Card className="overflow-hidden">
        <CardHeader className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold sm:text-2xl">
                {table.title}
              </CardTitle>
              <CardDescription>{table.description}</CardDescription>
            </div>
            {/* {showSearch && null} */}
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <TableSkeleton columns={columns.length} rows={8} />
          ) : rows.length === 0 ? (
            (emptyState ?? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <h3 className="text-lg font-semibold">لا توجد بيانات</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  لا توجد نتائج لعرضها
                </p>
              </div>
            ))
          ) : (
            <div className="space-y-4">
              <div className="w-full overflow-x-auto rounded-md border">
                <Table className="min-w-200">
                  <TableHeader>
                    <TableRow>
                      {columns.map((column, index) => (
                        <TableHead
                          key={generateId()}
                          className="whitespace-nowrap text-right"
                        >
                          {column.title}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {rows.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {columns.map((column, colIndex) => (
                          <TableCell
                            key={colIndex}
                            className="whitespace-nowrap text-right"
                          >
                            {renderCell(row, column)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {hasNextPage && (
                <div className="flex justify-center pt-2">
                  <Button
                    variant="outline"
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                  >
                    {isFetchingNextPage && (
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    )}
                    {isFetchingNextPage ? "جاري التحميل..." : "تحميل المزيد"}
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function isPaginatedResponse<T>(
  data: IPagination<T> | T[],
): data is IPagination<T> {
  return (
    !Array.isArray(data) &&
    typeof data === "object" &&
    data !== null &&
    "content" in data &&
    "page" in data &&
    "last" in data
  );
}

export default TableDashboardPage;
