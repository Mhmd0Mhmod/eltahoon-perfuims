"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, RefreshCcw } from "lucide-react";
import Link from "next/link";

interface BrandErrorProps {
  error?: Error & { digest?: string };
  reset?: () => void;
  homeHref?: string;
  homeLabel?: string;
  title?: string;
  description?: string;
}

function BrandError({
  error,
  reset,
  homeHref = "/",
  homeLabel = "الصفحة الرئيسية",
  title = "حدث خطأ ما!",
  description = "عذراً، حدث خطأ غير متوقع أثناء تحميل هذه الصفحة. يرجى المحاولة مرة أخرى.",
}: BrandErrorProps) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="editorial-shell relative w-full max-w-lg overflow-hidden px-8 py-12 text-center sm:px-12">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-l from-transparent via-primary/60 to-transparent" />
        <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_50%_0%,rgba(198,156,74,0.12),transparent_55%)]" />

        <div className="relative">
          <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center border border-destructive/30 bg-destructive/8">
            <AlertCircle className="text-destructive h-7 w-7" />
          </div>

          <h1 className="text-2xl font-semibold md:text-3xl">{title}</h1>

          <div className="heritage-divider mx-auto mt-5 h-px w-20" />

          <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
            {description}
          </p>

          {error?.message && (
            <Alert
              variant="destructive"
              className="mt-6 max-h-60 overflow-y-auto rounded-none border text-right"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              <AlertDescription className="text-sm break-words">
                {error.message}
              </AlertDescription>
            </Alert>
          )}

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
            {reset && (
              <Button
                onClick={reset}
                className="h-11 px-6 text-xs tracking-[0.14em] uppercase"
              >
                <RefreshCcw className="ml-2 size-4" />
                حاول مرة أخرى
              </Button>
            )}

            <Button
              variant="outline"
              render={<Link href={homeHref} />}
              className="h-11 px-6 text-xs tracking-[0.14em] uppercase"
            >
              <Home className="ml-2 size-4" />
              {homeLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandError;
