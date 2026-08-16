import Image from "next/image";
import MarketLink from "./MarketLink";

function Logo() {
  return (
    <MarketLink
      href="/"
      className="flex items-center gap-3 transition-opacity hover:opacity-80"
      aria-label="Go to homepage"
    >
      <div className="relative h-12 w-12 shrink-0 sm:h-14 sm:w-14">
        <Image
          src="/logo.png"
          alt="مؤسسه طاحون - المسك للعطور"
          width={56}
          height={56}
          priority
          className="h-full w-full object-contain"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-primary text-base leading-tight font-semibold tracking-[0.08em] sm:text-lg">
          مؤسسه طاحون
        </span>
        <span className="text-muted-foreground text-[11px] tracking-[0.18em] sm:text-xs">
          المسك للعطور
        </span>
      </div>
    </MarketLink>
  );
}

export default Logo;
