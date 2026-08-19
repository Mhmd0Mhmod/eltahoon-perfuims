import { SearchX, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-indigo-50 p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <SearchX className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-blue-900">
            المنتج غير موجود
          </CardTitle>
          <CardDescription className="text-gray-600">
            عذراً، المنتج الذي تبحث عنه غير متوفر أو تم حذفه.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button variant="outline" className="flex items-center gap-2">
              <Link href="/products">
                <ArrowLeft className="h-4 w-4" />
                العودة للمنتجات
              </Link>
            </Button>
            <Button className="flex items-center gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                الصفحة الرئيسية
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
