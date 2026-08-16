import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between space-y-2">
        <Skeleton className="h-9 w-50" />
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-25" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-7 w-30" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Overview Chart and Recent Sales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Overview Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <Skeleton className="h-6 w-37.5" />
          </CardHeader>
          <CardContent className="pl-2">
            <Skeleton className="h-87.5 w-full" />
          </CardContent>
        </Card>

        {/* Recent Sales */}
        <Card className="col-span-3">
          <CardHeader>
            <Skeleton className="h-6 w-37.5" />
            <Skeleton className="mt-2 h-4 w-45" />
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <div className="mr-4 space-y-1">
                    <Skeleton className="h-4 w-25" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="mr-auto h-4 w-15" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="col-span-4">
        <CardHeader>
          <Skeleton className="h-6 w-37.5" />
          <Skeleton className="mt-2 h-4 w-50" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-30" />
                <Skeleton className="h-6 w-15" />
                <Skeleton className="h-4 w-25" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="ml-auto h-8 w-8" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
