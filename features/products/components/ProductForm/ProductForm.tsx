"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { productSchema, ProductSchema } from "../../schema";
import { ProductBasicInfo } from "./ProductBasicInfo";
import { ProductCategories } from "./ProductCategories";
import { ProductImage } from "./ProductImage";
import { ProductSubmitButton } from "./ProductSubmitButton";
// import ProductVariants from "./ProductVariants";
import { IProduct } from "../../types";
import ProductVariants from "./ProductVarients/ProductVarients";
interface ProductFormProps {
  product?: IProduct;
}
function ProductForm({ product }: ProductFormProps) {
  const isEditMode = Boolean(product);

  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          ...product,
          categoryIds: product.categories.map((category) =>
            category.id.toString(),
          ),
          variants: product.variants.map((variant) => ({
            id: variant.id,
            price: variant.oldPrice,
            size: variant.size,
            unit: variant.unit,
            isAvailable: variant.isAvailable,
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
    async (data: ProductSchema) => {
      const toastId = toast.loading(
        isEditMode ? "جارى تحديث المنتج..." : "جارى إضافة المنتج...",
      );

      try {
        // const response = isEditMode
        //   ? await updateProduct(product!.id, data)
        //   : await addProduct(data);
        const response = { success: true, message: "تمت العملية بنجاح" };
        if (!response.success) {
          toast.error(
            response.message ||
              (isEditMode
                ? "حدث خطأ أثناء تحديث المنتج"
                : "حدث خطأ أثناء إضافة المنتج"),
            { id: toastId },
          );
          return;
        }

        toast.success(
          response.message ||
            (isEditMode ? "تم تحديث المنتج بنجاح" : "تم إضافة المنتج بنجاح"),
          { id: toastId },
        );

        if (!isEditMode) {
          form.reset();
        }
      } catch {
        toast.error(
          isEditMode
            ? "حدث خطأ أثناء تحديث المنتج"
            : "حدث خطأ أثناء إضافة المنتج",
          {
            id: toastId,
          },
        );
      }
    },
    [isEditMode, product, form],
  );

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 text-right p-10"
        dir="rtl"
      >
        <div className="-mx-3 space-y-6 p-4">
          <ProductBasicInfo />

          <ProductCategories />

          <ProductImage product={product} />

          <div className="border-t pt-4">
            <ProductVariants />
          </div>
        </div>

        <ProductSubmitButton isEditMode={isEditMode} />
      </form>
    </FormProvider>
  );
}

export default ProductForm;
