import z from "zod";

const baseCategorySchema = {
  name: z.string({ message: "اسم التصنيف مطلوب" }).min(3, {
    message: "اسم التنصيف يجب ان يكون 3 احرف علي الاقل",
  }),
  description: z.string().nullable(),
  isActive: z.boolean(),
  isAtHomePage: z.boolean(),
  productIds: z.array(z.number()).optional(),
};
export const addCategorySchema = z.object({
  ...baseCategorySchema,
  children: z.array(z.object(baseCategorySchema)).optional(),
});
export type AddCategorySchema = z.infer<typeof addCategorySchema>;
