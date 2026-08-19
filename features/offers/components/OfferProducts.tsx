"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Package } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

import FormatCurrency from "@/components/FormatCurrency";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IProduct } from "@/features/products/types";
import { OfferFormValues } from "../schema";

interface OfferProductsProps {
  products: IProduct[];
}

export default function OfferProducts({ products }: OfferProductsProps) {
  const { control, setValue, getValues } = useFormContext<OfferFormValues>();

  const selectedIds =
    useWatch({
      control,
      name: "productVariantIds",
    }) ?? [];

  const toggleVariant = (id: number) => {
    const current = getValues("productVariantIds");

    setValue(
      "productVariantIds",
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
  };

  const toggleProduct = (product: IProduct, checked: boolean) => {
    const current = getValues("productVariantIds");

    const ids = product.variants.map((variant) => variant.id);

    setValue(
      "productVariantIds",
      checked
        ? [...current, ...ids.filter((id) => !current.includes(id))]
        : current.filter((id) => !ids.includes(id)),
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
  };

  const isFullySelected = (product: IProduct) =>
    product.variants.length > 0 &&
    product.variants.every((variant) => selectedIds.includes(variant.id));

  const isPartiallySelected = (product: IProduct) => {
    const count = product.variants.filter((variant) =>
      selectedIds.includes(variant.id),
    ).length;

    return count > 0 && count < product.variants.length;
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Package className="h-5 w-5" />
            المنتجات المشمولة بالعرض
          </h2>

          <p className="text-sm text-muted-foreground">
            اختر المنتجات والأحجام التي سيشملها العرض.
          </p>
        </div>

        {selectedIds.length > 0 && (
          <Badge variant="secondary">{selectedIds.length} محدد</Badge>
        )}
      </div>

      {products.length === 0 ? (
        <div className="rounded-md border border-dashed py-8 text-center">
          <Package className="mx-auto mb-2 h-10 w-10 text-muted-foreground" />

          <p className="text-sm text-muted-foreground">لا توجد منتجات متاحة</p>
        </div>
      ) : (
        <div className="max-h-100 overflow-y-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">#</TableHead>
                <TableHead>المنتج</TableHead>
                <TableHead>الحجم</TableHead>
                <TableHead>السعر</TableHead>
                <TableHead className="text-center">اختيار</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {products.map((product) => (
                <ProductRows
                  key={product.id}
                  product={product}
                  selectedIds={selectedIds}
                  fullySelected={isFullySelected(product)}
                  partiallySelected={isPartiallySelected(product)}
                  onToggleProduct={toggleProduct}
                  onToggleVariant={toggleVariant}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  );
}

function ProductRows({
  product,
  selectedIds,
  fullySelected,
  partiallySelected,
  onToggleProduct,
  onToggleVariant,
}: {
  product: IProduct;
  selectedIds: number[];
  fullySelected: boolean;
  partiallySelected: boolean;
  onToggleProduct: (product: IProduct, checked: boolean) => void;
  onToggleVariant: (id: number) => void;
}) {
  return (
    <>
      <TableRow className="bg-muted/50">
        <TableCell className="text-center">
          <Checkbox
            checked={fullySelected}
            data-state={partiallySelected ? "indeterminate" : undefined}
            onCheckedChange={(checked) =>
              onToggleProduct(product, checked === true)
            }
          />
        </TableCell>

        <TableCell colSpan={4} className="font-medium">
          {product.name}
        </TableCell>
      </TableRow>

      {product.variants.map((variant) => (
        <TableRow key={variant.id}>
          <TableCell />

          <TableCell className="pr-8 text-sm text-muted-foreground">
            └ {variant.name || product.name}
          </TableCell>

          <TableCell>
            {variant.size} {variant.unit}
          </TableCell>

          <TableCell>
            <FormatCurrency value={variant.newPrice} />
          </TableCell>

          <TableCell className="text-center">
            <Checkbox
              checked={selectedIds.includes(variant.id)}
              onCheckedChange={() => onToggleVariant(variant.id)}
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
