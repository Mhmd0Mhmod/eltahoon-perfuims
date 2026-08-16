"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const pathname = usePathname();

  useEffect(() => {
    console.error(error);
  }, [error]);

  // Determine home route based on current path
  const getHomeRoute = () => {
    if (pathname.startsWith("/admin")) return "/admin";
    if (pathname.startsWith("/account")) return "/account";
    return "/";
  };

  const homeRoute = getHomeRoute();

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="bg-destructive/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <AlertCircle className="text-destructive h-8 w-8" />
          </div>
          <CardTitle className="text-2xl">حدث خطأ ما!</CardTitle>
          <CardDescription>عذراً، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error.message && (
            <Alert variant="destructive" className="max-h-60 overflow-y-auto">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <AlertDescription className="text-sm wrap-break-word">
                {error.message}
              </AlertDescription>
            </Alert>
          )}
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button onClick={reset} className="flex-1">
              <RefreshCcw className="ml-2 h-4 w-4" />
              حاول مرة أخرى
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href={homeRoute}>
                <Home className="ml-2 h-4 w-4" />
                الصفحة الرئيسية
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
