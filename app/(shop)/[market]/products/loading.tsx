import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function ProductCardSkeleton() {
  return (
    <Card className="p-0 overflow-hidden">
      <Skeleton className="aspect-square w-full" />
      <CardContent className="space-y-3 p-4 text-right sm:p-5">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
  );
}

function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6" dir="rtl">
      <div className="mb-10 text-right">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="mt-3 h-9 w-96 max-w-full" />
        <Skeleton className="mt-3 h-4 w-2/3 max-w-xl" />
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <div className="sticky top-20">
            <Card>
              <CardContent className="space-y-6 p-6">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
              </CardContent>
            </Card>
          </div>
        </aside>

        <main className="lg:col-span-3">
          <Card className="mb-6 flex items-center justify-between p-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-9 w-40" />
          </Card>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
export default Loading;
