"use client";

import { Button } from "@/components/ui/button";
import { ProductSchema } from "@/features/products/schema";
import { ISize } from "@/features/size/types";
import { Plus } from "lucide-react";
import { Control, useFieldArray, useFormContext } from "react-hook-form";
import ProductVariantItem from "./ProductVariantItem";

interface ProductVariantsProps {
  sizes?: ISize[];
}

function ProductVariants({ sizes }: ProductVariantsProps) {
  const { control } = useFormContext<ProductSchema>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const addVariant = () => {
    append({
      isAvailable: true,
      price: 0,
      size: undefined,
      unit: "",
      sizeId: undefined,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">أحجام المنتج</h3>

        <Button type="button" onClick={addVariant} size="sm" variant="outline">
          <Plus className="ml-2 h-4 w-4" />
          إضافة حجم
        </Button>
      </div>

      {fields.length === 0 && (
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          لا توجد أحجام. انقر على "إضافة حجم" لإضافة حجم جديد.
        </div>
      )}

      {fields.map((field, index) => (
        <ProductVariantItem
          key={field.id}
          index={index}
          sizes={sizes}
          onRemove={() => remove(index)}
        />
      ))}
    </div>
  );
}

export default ProductVariants;
