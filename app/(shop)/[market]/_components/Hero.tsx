import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-6 md:px-6 md:pt-10">
      <div className="editorial-shell relative mx-auto max-w-7xl overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-50 [background:radial-gradient(circle_at_14%_20%,rgba(198,156,74,0.12),transparent_34%),radial-gradient(circle_at_86%_78%,rgba(58,42,28,0.12),transparent_38%)]" />
        <div className="relative min-h-155 overflow-hidden md:min-h-180">
          <Image
            src="/logo.png"
            alt="مؤسسة طاحون للعطور"
            fill
            priority
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-linear-to-l from-black/70 via-black/38 to-black/15" />
          <div className="absolute inset-y-0 right-0 hidden w-28 border-l border-white/20 bg-white/5 backdrop-blur-[1px] md:block" />

          <div className="absolute inset-0 flex items-end">
            <div className="max-w-3xl px-6 py-10 text-white md:px-14 md:py-16 lg:px-20 lg:py-24">
              <p className="mb-5 text-[11px] tracking-[0.45em] text-white/85 uppercase">
                Al-Tahoun Heritage Perfumery
              </p>

              <h1 className="text-4xl leading-[1.18] font-semibold md:text-6xl lg:text-7xl">
                نفحات تحكي
                <br />
                مجد التراث
              </h1>

              <div className="heritage-divider mt-7 h-px w-44" />

              <p className="mt-7 max-w-xl text-sm leading-8 text-white/85 md:text-base">
                عطور عربية فاخرة بتوازن حديث. مواد منتقاة بعناية من العود والمسك
                والورد الشرقي، بصياغة هادئة تترك أثرًا أنيقًا يدوم.
              </p>

              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Button
                  size="lg"
                  className="h-11 rounded-none border border-white/30 bg-white/12 px-7 text-sm tracking-[0.16em] text-white uppercase backdrop-blur-sm hover:bg-white/20"
                >
                  <Link href="/products">
                    اكتشف المجموعة
                    <ArrowLeft className="mr-2 size-4" />
                  </Link>
                </Button>

                <p className="text-xs tracking-[0.3em] text-white/70 uppercase">
                  Since 1987
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
