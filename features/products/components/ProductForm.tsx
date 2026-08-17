"use client";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useCallback } from "react";
import { useForm, useFormState } from "react-hook-form";
// import ProductVariants from "./ProductVariants";
import { Product } from "../types";
import { addProductSchema, AddProductSchema } from "../schema";
import { toast } from "@/components/ui/toast";

interface AddProductFormProps {
  product?: Product;
}

function AddProductForm({ product }: AddProductFormProps) {
  const isEditMode = Boolean(product);
  const form = useForm<AddProductSchema>({
    resolver: zodResolver(addProductSchema),
    defaultValues: product
      ? {
          ...product,
          categoryIds: product.categories.map((cat) => cat.id.toString()),
          variants: product.variants.map((varient) => ({
            id: varient.id,
            price: varient.oldPrice,
            size: varient.size,
            unit: varient.unit,
            isAvailable: varient.isAvailable,
          })),
        }
      : {
          name: "",
          description: "",
          categoryIds: [],
          variants: [],
        },
  });
  const onSubmit = useCallback(
    async (data: AddProductSchema) => {
      const id = toast.add({
        title: isEditMode ? "جارٍ تحديث المنتج..." : "جارٍ إضافة المنتج...",
        type: "loading",
      });
      try {
        if (isEditMode) {
          const response = await updateProduct(product!.id, data);
          if (response.success) {
            toast.success(response.message || "تم تحديث المنتج بنجاح", { id });
          } else {
            toast.error(response.message || "حدث خطأ أثناء تحديث المنتج", {
              id,
            });
          }
          return;
        }
        const response = await addProduct(data);
        if (response.success) {
          toast.success(response.message || "تم إضافة المنتج بنجاح", { id });
          form.reset();
        } else {
          toast.error(response.message || "حدث خطأ أثناء إضافة المنتج", { id });
        }
      } catch {
        toast.error(
          isEditMode
            ? "حدث خطأ أثناء تحديث المنتج"
            : "حدث خطأ أثناء إضافة المنتج",
          {
            id,
          },
        );
      }
    },
    [isEditMode, product, form],
  );
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 text-right"
      >
        {/* Basic Info */}
        <div className="-mx-3 max-h-[65vh] space-y-4 overflow-y-auto p-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم المنتج</FormLabel>
                <FormControl>
                  <Input placeholder="اسم المنتج" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>وصف المنتج</FormLabel>
                <FormControl>
                  <Textarea placeholder="وصف المنتج" rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>التصنيفات</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={categories.map((cat) => ({
                      label: cat.name,
                      value: cat.id.toString(),
                    }))}
                    onChange={(values) => field.onChange(values)}
                    placeholder="اختر التصنيفات"
                    selected={field.value || []}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field: { value, onChange, ...field } }) => {
              return (
                <FormItem>
                  <FormLabel>رابط الصورة</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        onChange(file);
                      }}
                      onSubmit={() => {
                        onChange(value);
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    يمكنك مشاهدة معاينة للصورة الحاليه للمنتج.
                    <Button
                      variant="link"
                      size="sm"
                      disabled={!product?.imageUrl}
                    >
                      <Link href={product?.imageUrl || "#"} target="_blank">
                        معاينة الصورة
                      </Link>
                    </Button>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* Variants Section */}
          <div className="border-t pt-4">
            <ProductVariants control={form.control} sizes={sizes} />
          </div>
        </div>
        {/* Submit Button */}
        <SubmitingButton isEditMode={isEditMode} />
      </form>
    </Form>
  );
}

function SubmitingButton({ isEditMode }: { isEditMode: boolean }) {
  const { isSubmitting: pending } = useFormState();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending
        ? isEditMode
          ? "جارٍ تحديث المنتج..."
          : "جارٍ إضافة المنتج..."
        : isEditMode
          ? "تحديث المنتج"
          : "إضافة المنتج"}
    </Button>
  );
}

export default AddProductForm;
