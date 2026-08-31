"use client";

import BrandError from "@/components/BrandError";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AccountError({ error, reset }: ErrorProps) {
  return (
    <BrandError
      error={error}
      reset={reset}
      homeHref="/account"
      homeLabel="حسابي"
    />
  );
}
