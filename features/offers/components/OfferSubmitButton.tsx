"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormState } from "react-hook-form";

interface Props {
  isEditing: boolean;
}

export default function OfferSubmitButton({ isEditing }: Props) {
  const { isSubmitting } = useFormState();

  return (
    <Button type="submit" className="w-full" disabled={isSubmitting}>
      {isSubmitting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}

      {isEditing ? "تحديث العرض" : "إنشاء العرض"}
    </Button>
  );
}
