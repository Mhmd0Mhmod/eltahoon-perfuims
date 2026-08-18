"use client";

import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import useAdminProducts from "@/features/products/hooks/useAdminProducts";
import { AddCategorySchema } from "../../schema";

interface CategoryProductsSelectorProps {}

export default function CategoryProductsSelector() {
  const [searchTerm, setSearchTerm] = useState("");
  const form = useFormContext<AddCategorySchema>();
  const { products, isLoading } = useAdminProducts();
  const { watch, getValues, setValue } = form;
  const selectedProductIds = watch("productIds") ?? [];

  const toggleProduct = (productId: number) => {
    const current = getValues("productIds") ?? [];
    if (current.includes(productId)) {
      setValue(
        "productIds",
        current.filter((id) => id !== productId),
        {
          shouldDirty: true,
          shouldValidate: true,
        },
      );

      return;
    }

    setValue("productIds", [...current, productId], {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const filteredProducts =
    products?.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ) ?? [];

  return (
    <>
      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">المنتجات</h3>

          {selectedProductIds.length > 0 && (
            <Badge variant="secondary">
              {selectedProductIds.length} منتج محدد
            </Badge>
          )}
        </div>

        <Input
          placeholder="ابحث عن منتج..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <div className="max-h-60 space-y-2 overflow-y-auto rounded-md border p-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-muted/50"
              >
                <Checkbox
                  id={`product-${product.id}`}
                  checked={selectedProductIds.includes(product.id)}
                  onCheckedChange={() => toggleProduct(product.id)}
                />

                <label
                  htmlFor={`product-${product.id}`}
                  className="flex-1 cursor-pointer text-sm"
                >
                  {product.name}
                </label>
              </div>
            ))
          ) : isLoading ? (
            <p className="py-4 text-center text-sm text-muted-foreground">
              جاري تحميل المنتجات...
            </p>
          ) : (
            <p className="py-4 text-center text-sm text-muted-foreground">
              لا توجد منتجات
            </p>
          )}
        </div>

        <Field>
          <FieldError>
            {/*
              If productIds has a Zod validation error,
              it will be displayed here.
            */}
          </FieldError>
        </Field>
      </div>
    </>
  );
}
