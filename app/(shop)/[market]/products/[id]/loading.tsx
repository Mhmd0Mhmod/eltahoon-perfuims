import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
function loading() {
  return (
    <div className="flex min-h-[90vh] flex-col items-center px-2 py-8">
      <div className="grid w-full max-w-5xl grid-cols-1 items-start gap-10 md:grid-cols-2">
        {/* Left: Product Image + Feature icons */}
        <div className="sticky top-8 flex flex-col gap-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border shadow-2xl">
            <Skeleton className="h-full w-full" />
          </div>

          {/* Feature icons skeletons */}
          <div className="mt-2 flex justify-center gap-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <CardTitle className="mb-1 text-4xl leading-tight">
              <Skeleton className="h-9 w-3/4" />
            </CardTitle>

            {/* Category badges skeleton */}
            <div className="mb-2 flex flex-wrap gap-2">
              {[1, 2, 3].map((b) => (
                <Badge key={b} variant="secondary" className="p-0">
                  <Skeleton className="h-6 w-16 rounded-full" />
                </Badge>
              ))}
            </div>

            {/* Price range skeleton */}
            <div className="mt-2 flex items-center gap-3">
              <Skeleton className="h-7 w-28" />
              <Skeleton className="h-7 w-28" />
            </div>
          </div>

          {/* Add to Cart Sticky Card placeholder */}
          <div className="sticky top-8 z-10">
            <Card className="border-none bg-transparent shadow-none">
              <CardContent className="flex flex-col gap-4 p-6">
                <Skeleton className="h-11 w-full rounded-md" />
              </CardContent>
            </Card>
          </div>

          {/* Details/Description Tab */}
          <div className="mt-4">
            <Card className="border-0 bg-slate-50/80">
              <CardHeader>
                <CardTitle className="text-lg">
                  <Skeleton className="h-5 w-28" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-10/12" />

                {/* Variants skeleton badges */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-6 w-32 rounded-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Meta info */}
          <div className="text-muted-foreground mt-2 flex items-center gap-2 text-xs">
            <Skeleton className="h-3 w-24" />
            <span className="mx-2">|</span>
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </div>

      {/* Related products placeholder */}
      <div className="mt-16 w-full max-w-5xl">
        <Card className="border-0 bg-linear-to-br from-slate-100 to-white/80 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">
              <Skeleton className="h-5 w-36" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="py-8 text-center">
              <Skeleton className="mx-auto h-5 w-64" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default loading;
