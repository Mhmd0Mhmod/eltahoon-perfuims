import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate } from "date-fns";
import { Package, Pencil } from "lucide-react";
import { ISize } from "../types";

export default function SizeCard({ size }: { size: ISize }) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 rounded-lg p-2">
              <Package className="text-primary h-6 w-6" />
            </div>
            <CardTitle className="text-2xl font-bold">
              {size.size} {size.unit}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground space-y-1 text-sm">
          <p>
            <span className="font-semibold">الحجم:</span> {size.size}
          </p>
          <p>
            <span className="font-semibold">الوحدة:</span> {size.unit}
          </p>
          <p className="pt-2 text-xs">
            <span className="font-semibold">تاريخ الإضافة:</span>{" "}
            {formatDate(size.createdAt, "dd/MM/yyyy")}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Dialog>
          <DialogTrigger render={<Button variant="outline" size="sm" />}>
            <Pencil className="h-4 w-4" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>تعديل الحجم</DialogTitle>
              <DialogDescription>
                عدل بيانات الحجم هنا. انقر حفظ عند الانتهاء.
              </DialogDescription>
            </DialogHeader>
            {/* <AddSizeDialog size={size} /> */}
          </DialogContent>
        </Dialog>
        {/* <DeleteSizeButton size={size} /> */}
      </CardFooter>
    </Card>
  );
}
