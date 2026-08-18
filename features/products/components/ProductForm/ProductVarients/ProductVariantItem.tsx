"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductSchema } from "@/features/products/schema";
import { ISize } from "@/features/size/types";

import { Trash2 } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import VariantAvailability from "./VariantAvailability";
import VariantCustomSize from "./VariantCustomSize";
import VariantPrice from "./VariantPrice";
import VariantSizeSelect from "./VariantSizeSelect";

interface ProductVariantItemProps {
  index: number;
  sizes?: ISize[];
  onRemove: () => void;
}

function ProductVariantItem({
  index,
  sizes,
  onRemove,
}: ProductVariantItemProps) {
  const form = useFormContext<ProductSchema>();
  const { control } = form;
  const selectedSizeId = useWatch({
    control,
    name: `variants.${index}.sizeId`,
  });

  const hasSelectedSize = Boolean(selectedSizeId);

  const handleSizeChange = (value: string) => {
    const sizeId = value ? Number(value) : undefined;

    form.setValue(`variants.${index}.sizeId`, sizeId?.toString(), {
      shouldDirty: true,
      shouldValidate: true,
    });

    if (sizeId) {
      form.setValue(`variants.${index}.size`, undefined);
      form.setValue(`variants.${index}.unit`, "");
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">الحجم {index + 1}</CardTitle>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="h-8 w-8 p-0"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <VariantSizeSelect index={index} />

        <VariantCustomSize index={index} disabled={hasSelectedSize} />

        <VariantPrice index={index} />

        <VariantAvailability index={index} />
      </CardContent>
    </Card>
  );
}
export default ProductVariantItem;
