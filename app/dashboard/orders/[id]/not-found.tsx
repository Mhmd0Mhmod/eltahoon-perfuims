import { FileX, ArrowLeft, Home } from "lucide-react";
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
    <div className="flex h-full items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
            <FileX className="h-8 w-8 text-teal-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-teal-900">
            الطلب غير موجود
          </CardTitle>
          <CardDescription className="text-gray-600">
            عذراً، الطلب الذي تبحث عنه غير متوفر في النظام.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button variant="outline" className="flex items-center gap-2">
              <Link href="/admin/orders">
                <ArrowLeft className="h-4 w-4" />
                العودة للطلبات
              </Link>
            </Button>
            <Button className="flex items-center gap-2">
              <Link href="/admin">
                <Home className="h-4 w-4" />
                لوحة التحكم
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
