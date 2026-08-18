"use client";

import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { type ReactNode } from "react";

import CardSkeleton from "@/components/CardSkeleton";
import Dialog from "@/components/Dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import useCookies from "@/hooks/useCookies";
import type { Description, Title } from "@/types";
import Link from "next/link";

type FormConfig =
  | (Title &
      Description & {
        component: ReactNode;
      })
  | (Title & {
      to: string;
    });

interface CardsDashboardPageProps<T, P = Record<string, unknown>> {
  title: string;
  description: string;
  params: P;
  queryKey: string;

  queryFn: (params: P) => Promise<{
    data: T[];
  }>;

  renderCard: (item: T) => ReactNode;

  form?: FormConfig;
  emptyState?: ReactNode;

  gridColumns?: 1 | 2 | 3 | 4;
}

const gridColumnsClasses = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
} as const;

function CardsDashboardPage<T, P = Record<string, unknown>>({
  title,
  description,
  params,
  queryKey,
  queryFn,
  renderCard,
  form,
  emptyState,
  gridColumns = 3,
}: CardsDashboardPageProps<T, P>) {
  const { getCookie } = useCookies();
  const countryCode = getCookie("country_code");

  const { data, isLoading } = useQuery({
    queryKey: ["cards", countryCode, queryKey, params],

    queryFn: () => queryFn(params),

    enabled: Boolean(countryCode && queryKey),
  });

  const items: T[] = data?.data ?? [];

  const gridClass = gridColumnsClasses[gridColumns];

  return (
    <div dir="rtl" className="container mx-auto w-full space-y-6 p-4 sm:p-6">
      {/* Header */}
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
            <Link
              href={form.to}
              className="flex items-center justify-center gap-2"
            >
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

      {/* Cards Container */}
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 py-4">
          {isLoading ? (
            <CardsSkeleton columns={gridColumns} />
          ) : items.length === 0 ? (
            (emptyState ?? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <h3 className="text-lg font-semibold">لا توجد بيانات</h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  لا توجد نتائج لعرضها
                </p>
              </div>
            ))
          ) : (
            <div
              className={`grid items-stretch gap-6 md:grid-cols-2 ${gridClass}`}
            >
              {items.map((item, index) => (
                <div key={getItemKey(item, index)} className="h-full">
                  {renderCard(item)}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function CardsSkeleton({ columns }: { columns: 1 | 2 | 3 | 4 }) {
  return (
    <div className={`grid gap-6 md:grid-cols-2 ${gridColumnsClasses[columns]}`}>
      {Array.from({ length: columns * 2 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}

function getItemKey<T>(item: T, index: number): string | number {
  if (
    typeof item === "object" &&
    item !== null &&
    "id" in item &&
    (typeof item.id === "string" || typeof item.id === "number")
  ) {
    return item.id;
  }

  return index;
}

export default CardsDashboardPage;
