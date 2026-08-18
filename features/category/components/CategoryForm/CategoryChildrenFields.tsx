"use client";

import { Plus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { AddCategorySchema } from "../../schema";
import CategoryChildItem from "./CategoryChildItem";

export default function CategoryChildrenFields() {
  const form = useFormContext<AddCategorySchema>();
  const { control } = form;
  const { append, fields, remove } = useFieldArray({
    control,
    name: "children",
  });

  const createNewChildCategory = () => ({
    name: "",
    description: "",
    isActive: true,
    isAtHomePage: false,
  });

  return (
    <>
      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">التصنيفات الفرعية</h3>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append(createNewChildCategory())}
          >
            <Plus className="ml-2 h-4 w-4" />
            إضافة تصنيف فرعي
          </Button>
        </div>

        {fields.map((field, index) => (
          <CategoryChildItem
            key={field.id}
            control={control}
            index={index}
            onRemove={() => remove(index)}
          />
        ))}
      </div>
    </>
  );
}
