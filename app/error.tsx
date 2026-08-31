"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <div className="flex min-h-screen items-center justify-center bg-[#f7f3ec] px-4">
          <div className="editorial-shell relative w-full max-w-lg overflow-hidden px-8 py-12 text-center sm:px-12">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-l from-transparent via-primary/60 to-transparent" />

            <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center border border-destructive/30 bg-destructive/8">
              <AlertCircle className="text-destructive h-7 w-7" />
            </div>

            <h1 className="text-2xl font-semibold text-foreground md:text-3xl">
              حدث خطأ غير متوقع
            </h1>

            <div className="heritage-divider mx-auto mt-5 h-px w-20" />

            <p className="text-muted-foreground mx-auto mt-5 max-w-sm text-sm leading-7">
              عذراً، حدث خطأ أساسي أثناء تشغيل التطبيق. يرجى المحاولة مرة أخرى.
            </p>

            {error?.message && (
              <p className="text-muted-foreground mt-5 max-h-40 overflow-y-auto break-words text-xs">
                {error.message}
              </p>
            )}

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                onClick={reset}
                className="h-11 px-6 text-xs tracking-[0.14em] uppercase"
              >
                <RefreshCcw className="ml-2 size-4" />
                حاول مرة أخرى
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
