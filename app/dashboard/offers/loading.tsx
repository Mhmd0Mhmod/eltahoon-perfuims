import StatsSkeleton from "@/components/shared/stats-skeleton";
import TableSkeleton from "@/components/shared/table-skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-5 w-48" />
        </div>
        <Skeleton className="h-10 w-28" />
      </div>

      {/* Stats Cards */}
      <StatsSkeleton length={4} />

      {/* Main Table Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="space-y-2 text-right">
              <Skeleton className="h-7 w-32" />
              <Skeleton className="h-5 w-48" />
            </div>
            <Skeleton className="h-10 w-full md:w-80" />
          </div>
        </CardHeader>
        <CardContent>
          <TableSkeleton columns={6} rows={5} />
        </CardContent>
      </Card>
    </div>
  );
}
