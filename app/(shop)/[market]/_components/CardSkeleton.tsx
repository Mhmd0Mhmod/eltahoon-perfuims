import { Skeleton } from "@/components/ui/skeleton";

function CardSkeleton() {
  return (
    <article className="editorial-shell relative p-6 text-right">
      <Skeleton className="h-4 w-8" />

      <Skeleton className="mt-4 h-7 w-32" />

      <div className="mt-3 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </article>
  );
}

export default CardSkeleton;
