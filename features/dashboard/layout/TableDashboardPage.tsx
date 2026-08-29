"use client";

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

import Table from "@/components/Table";
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

export interface DashboardPageProps<T> {
  title: string;
  description: string;
  table: TableConfig;
  form?: FormConfig;
  stats?: StatsCardData[];
  columns: Column<T>[];
  emptyState?: ReactNode;
  rows: T[];
  isLoading: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
}
function TableDashboardPage<T>({
  title,
  description,
  table,
  form,
  stats,
  columns,
  emptyState,
  rows,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: DashboardPageProps<T>) {
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
          <Dialog>
            <Dialog.Trigger>
              <Plus className="ml-2 h-4 w-4" />
              {form.title}
            </Dialog.Trigger>
            <Dialog.Content title={form.title} description={form.description}>
              {form.component}
            </Dialog.Content>
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
                <Table columns={columns} rows={rows} />
              </div>

              {/* Pagination */}
              {hasNextPage && (
                <div className="flex justify-center pt-2">
                  <Button
                    variant="outline"
                    onClick={() => fetchNextPage?.()}
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
