import { AddSizeDialog } from "@/components/admin/sizes/AddSizeDialog";
import { SizeCard } from "@/components/admin/sizes/SizeCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { SizeAPI } from "@/lib/api/size";
import { Package, Plus } from "lucide-react";
import { Suspense } from "react";

function SizesPage() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
            <Package className="h-8 w-8" />
            أحجام الزجاجات
          </h1>
          <p className="text-muted-foreground">إدارة أحجام زجاجات العطور</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              إضافة حجم
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-131.25">
            <DialogHeader>
              <DialogTitle>إضافة حجم جديد</DialogTitle>
              <DialogDescription>
                أدخل بيانات الحجم الجديد هنا. انقر حفظ عند الانتهاء.
              </DialogDescription>
            </DialogHeader>
            <AddSizeDialog />
          </DialogContent>
        </Dialog>
      </div>

      <Suspense
        fallback={
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        }
      >
        <SizesList />
      </Suspense>
    </div>
  );
}

async function SizesList() {
  const sizes = await SizeAPI.getAdminSizes();

  if (sizes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>لا توجد أحجام</CardTitle>
          <CardDescription>ابدأ بإضافة حجم جديد باستخدام الزر أعلاه</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sizes.map((size) => (
          <SizeCard key={size.id} size={size} />
        ))}
      </div>
    </>
  );
}

export default SizesPage;
