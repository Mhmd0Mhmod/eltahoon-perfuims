import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

interface BrandNotFoundProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  backHref: string;
  backLabel: string;
  homeHref?: string;
  homeLabel?: string;
}

function BrandNotFound({
  icon,
  title,
  description,
  backHref,
  backLabel,
  homeHref = "/",
  homeLabel = "الصفحة الرئيسية",
}: BrandNotFoundProps) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="editorial-shell relative w-full max-w-lg overflow-hidden px-8 py-12 text-center sm:px-12">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-l from-transparent via-primary/60 to-transparent" />
        <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_50%_0%,rgba(198,156,74,0.12),transparent_55%)]" />

        <div className="relative">
          <p className="text-[11px] tracking-[0.4em] text-primary/80 uppercase">
            404
          </p>

          <div className="mx-auto mt-6 mb-7 flex h-16 w-16 items-center justify-center border border-primary/30 bg-primary/5">
            {icon}
          </div>

          <h1 className="text-2xl font-semibold md:text-3xl">{title}</h1>

          <div className="heritage-divider mx-auto mt-5 h-px w-20" />

          <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
            {description}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
            <Button
              variant="outline"
              render={<Link href={backHref} />}
              className="h-11 px-6 text-xs tracking-[0.14em] uppercase"
            >
              <ArrowLeft className="ml-2 size-4" />
              {backLabel}
            </Button>

            <Button
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

export default BrandNotFound;
