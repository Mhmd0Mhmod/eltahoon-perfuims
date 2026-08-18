"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pencil } from "lucide-react";

import AlertDialog from "@/components/AlertDialog";
import Dialog from "@/components/Dialog";
import { ICategory } from "../types";
import { CategoryForm } from "./CategoryForm/CategoryForm";

export function CategoryCard({ category }: { category: ICategory }) {
  return (
    <Card className="gap-2 h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-xl">{category.name}</CardTitle>
          </div>

          <CardDescription className="flex flex-col gap-2">
            <Badge variant={category.isActive ? "default" : "secondary"}>
              {category.isActive ? "نشط" : "غير نشط"}
            </Badge>

            {category.isAtHomePage && (
              <Badge variant="outline">عرض بالرئيسية</Badge>
            )}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-md text-muted-foreground">
          {category.description || "لا يوجد وصف"}
        </p>

        {category.children && category.children.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">
              التصنيفات الفرعية ({category.children.length}
              ):
            </h4>

            <div className="flex flex-wrap gap-1">
              {category.children.map((sub) => (
                <Badge key={sub.id} variant="secondary" className="text-[10px]">
                  {sub.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="mt-auto flex justify-end gap-2">
        <Dialog
          title={`تعديل التصنيف: ${category.name}`}
          description={`تعديل بيانات التصنيف: ${category.name}`}
          triggerRender={<Pencil className="h-4 w-4" />}
        >
          <CategoryForm category={category} />
        </Dialog>

        {/* <AlertDialog>
          <AlertDialogTrigger
            render={<Button variant="destructive" size="sm" />}
          >
            <Trash2 className="h-4 w-4" />
          </AlertDialogTrigger>

          <AlertDialogContent className="min-w-md border-2">
            <AlertDialogHeader>
              <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>

              <AlertDialogDescription>
                هذا الإجراء لا يمكن التراجع عنه. سيتم حذف التصنيف &quot;
                {category.name}
                &quot; نهائياً.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>إلغاء</AlertDialogCancel>

              <AlertDialogAction>حذف</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog> */}
        <AlertDialog
          title={`حذف التصنيف: ${category.name}`}
          description={`هل أنت متأكد من حذف التصنيف: ${category.name}؟ هذا الإجراء لا يمكن التراجع عنه.`}
          onConfirm={() => {
            // Handle delete action here
          }}
          triggerVariant="destructive"
          actionButtonText="حذف"
        />
      </CardFooter>
    </Card>
  );
}
