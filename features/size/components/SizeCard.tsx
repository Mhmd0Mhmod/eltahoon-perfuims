import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "date-fns";
import { Package, Pencil, Trash } from "lucide-react";
import { ISize } from "../types";
import Dialog from "@/components/Dialog";
import SizeForm from "./SizeForm";
import AlertDialog from "@/components/AlertDialog";
import { useMutation } from "@tanstack/react-query";
import { deleteSize } from "@/app/dashboard/actions";
import { toast } from "sonner";

export default function SizeCard({ size }: { size: ISize }) {
  const { mutate } = useMutation({
    mutationKey: ["delete-size"],
    mutationFn: deleteSize,
    onSuccess: (data, _, __, context) => {
      if (data.success) {
        context.client.invalidateQueries({
          predicate: (query) =>
            query.queryKey.some(
              (key) =>
                typeof key === "string" && key.toLowerCase().includes("size"),
            ),
          type: "active",
        });
        toast.success(data.message || "تم حذف الحجم بنجاح");
      } else {
        toast.error(data.message || "حدث خطأ أثناء حذف الحجم");
      }
    },
  });
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
        <Dialog
          title="تعديل الحجم"
          description="قم بتعديل بيانات الحجم هنا. انقر حفظ عند الانتهاء."
          triggerRender={<Pencil className="h-4 w-4" />}
          variant="outline"
        >
          <SizeForm size={size} />
        </Dialog>
        <AlertDialog
          title="حذف الحجم"
          description="هل أنت متأكد أنك تريد حذف هذا الحجم؟ لا يمكن التراجع عن هذا الإجراء."
          triggerRender={<Trash className="h-4 w-4" />}
          onConfirm={() => mutate(size.id)}
          actionButtonText="حذف"
          triggerVariant="destructive"
        />
      </CardFooter>
    </Card>
  );
}
