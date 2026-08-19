"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { addCategory, updateCategory } from "@/app/dashboard/actions";
import { toast } from "sonner";
import { AddCategorySchema, addCategorySchema } from "../../schema";
import { ICategory } from "../../types";

import CategoryBasicFields from "./CategoryBasicFields";
import CategoryChildrenFields from "./CategoryChildrenFields";
import CategoryProductsSelector from "./CategoryProductsSelector";

export function CategoryForm({ category }: { category?: ICategory }) {
  const router = useRouter();
  const form = useForm<AddCategorySchema>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: category
      ? {
          name: category.name ?? "",
          description: category.description ?? "",
          isActive: category.isActive ?? true,
          isAtHomePage: category.isAtHomePage ?? false,
          productIds: [],
          children:
            category.children?.map((child) => ({
              name: child.name ?? "",
              description: child.description ?? "",
              isActive: child.isActive ?? true,
              isAtHomePage: child.isAtHomePage ?? false,
            })) ?? [],
        }
      : {
          name: "",
          description: "",
          isActive: true,
          isAtHomePage: false,
          productIds: [],
          children: [],
        },
  });

  const handleSubmit = useCallback(
    async (data: AddCategorySchema) => {
      const isEdit = Boolean(category);

      const response = isEdit
        ? await updateCategory(category!.id, data)
        : await addCategory(data);
      if (!response.success) {
        const message =
          response.message ||
          (isEdit
            ? "حدث خطأ أثناء تعديل التصنيف"
            : "حدث خطأ أثناء إضافة التصنيف");

        form.setError("root", {
          type: "manual",
          message,
        });

        toast.error("خطأ", {
          description: message,
        });

        return;
      }

      const message =
        response.message ||
        (isEdit ? "تم تعديل التصنيف بنجاح" : "تم إضافة التصنيف بنجاح");
      toast.success(
        isEdit ? "تم تعديل التصنيف بنجاح" : "تم إضافة التصنيف بنجاح",
        {
          description: message,
        },
      );
      if (!isEdit) {
        form.reset();
      }
    },
    [category, form, router],
  );

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <FormProvider {...form}>
        <div className="space-y-6">
          <CategoryBasicFields />

          <CategoryProductsSelector />

          <CategoryChildrenFields />
        </div>

        {form.formState.errors.root?.message && (
          <p className="text-sm text-red-600">
            {form.formState.errors.root.message}
          </p>
        )}

        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-full rounded-none border border-primary/40 bg-primary/10 px-8 text-sm tracking-[0.16em] text-primary hover:bg-primary/20 sm:w-auto"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "جاري الحفظ..."
              : category
                ? "تحديث التصنيف"
                : "حفظ التصنيف"}
          </Button>
        </div>
      </FormProvider>
    </form>
  );
}
