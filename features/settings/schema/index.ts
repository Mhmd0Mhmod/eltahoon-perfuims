import z from "zod";

export const storeSettingsSchema = z.object({
  facebookUrl: z.string().url().optional().or(z.literal("")),
  instagramUrl: z.string().url().optional().or(z.literal("")),
  twitterUrl: z.string().url().optional().or(z.literal("")),
  whatsappNumber: z.string().optional(),
});

export type StoreSettingsSchema = z.infer<typeof storeSettingsSchema>;
