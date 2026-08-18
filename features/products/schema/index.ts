import z from "zod";

export const productVariantSchema = z
  .object({
    id: z.number().optional(),
    sizeId: z.string().optional().nullable(),
    size: z.number().optional().nullable(),
    unit: z.string().optional().nullable(),
    price: z.number().refine((val) => val >= 0, {
      message: "السعر يجب ان يكون رقم موجب",
    }),
    isAvailable: z.boolean(),
  })
  .refine(
    (data) => {
      // Either sizeId is provided OR both size and unit are provided
      return (
        data.sizeId ||
        (data.size && data.size > 0 && data.unit && data.unit.length > 0)
      );
    },
    {
      message: "يجب اختيار حجم من القائمة أو إدخال حجم ووحدة مخصصة",
    },
  );
export type ProductVariantSchema = z.infer<typeof productVariantSchema>;
export const productSchema = z.object({
  name: z.string({ message: "اسم المنتج مطلوب" }).min(3, {
    message: "اسم المنتج يجب ان يكون 3 احرف علي الاقل",
  }),
  description: z.string().optional(),
  variants: z.array(productVariantSchema).optional(),
  categoryIds: z.array(z.string()).optional(),
  image: z.instanceof(File).optional(),
});
export type ProductSchema = z.infer<typeof productSchema>;
