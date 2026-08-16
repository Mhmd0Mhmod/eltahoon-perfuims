import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AuthLoading() {
  return (
    <>
      <CardHeader className="space-y-2">
        <CardTitle className="text-center">
          <Skeleton className="mx-auto h-8 w-32" />
        </CardTitle>
        <CardDescription className="text-center">
          <Skeleton className="mx-auto h-4 w-48" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Email/Username field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
            <div className="flex justify-end">
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          {/* Submit button */}
          <Skeleton className="h-10 w-full" />

          {/* Footer links */}
          <div className="space-y-2 text-center">
            <Skeleton className="mx-auto h-4 w-48" />
          </div>
        </div>
      </CardContent>
    </>
  );
}
