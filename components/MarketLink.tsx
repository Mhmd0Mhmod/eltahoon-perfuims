"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps } from "react";

type MarketLinkProps = ComponentProps<typeof Link> & {
  children: React.ReactNode;
};

function MarketLink({ href, children, ...props }: MarketLinkProps) {
  const { market } = useParams<{ market: string }>();

  const marketHref =
    typeof href === "string"
      ? `/${market}${href.startsWith("/") ? href : `/${href}`}`
      : href;

  return (
    <Link href={marketHref} {...props}>
      {children}
    </Link>
  );
}

export default MarketLink;
