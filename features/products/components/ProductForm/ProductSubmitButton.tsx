"use client";

import { Button } from "@/components/ui/button";
import { useFormState } from "react-hook-form";

interface ProductSubmitButtonProps {
  isEditMode: boolean;
}

export function ProductSubmitButton({ isEditMode }: ProductSubmitButtonProps) {
  const { isSubmitting } = useFormState();

  return (
    <Button
      type="submit"
      className="w-full rounded-none border border-primary/40 bg-primary/10 px-8 text-sm tracking-[0.16em] text-primary hover:bg-primary/20"
      disabled={isSubmitting}
    >
      {isSubmitting
        ? isEditMode
          ? "جارٍ تحديث المنتج..."
          : "جارٍ إضافة المنتج..."
        : isEditMode
          ? "تحديث المنتج"
          : "إضافة المنتج"}
    </Button>
  );
}
