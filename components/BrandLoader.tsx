import { Skeleton } from "@/components/ui/skeleton";

interface BrandLoaderProps {
  fullScreen?: boolean;
}

function BrandLoader({ fullScreen = false }: BrandLoaderProps) {
  return (
    <div
      className={
        fullScreen
          ? "flex min-h-[70vh] items-center justify-center"
          : "flex w-full items-center justify-center py-16"
      }
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative flex h-14 w-14 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-none border-2 border-primary/15 border-t-primary" />
          <div className="h-2 w-2 rounded-none bg-primary/60" />
        </div>
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  );
}

export default BrandLoader;
