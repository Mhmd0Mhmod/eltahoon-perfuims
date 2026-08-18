export const SIZES_UNITS = {
  ML: "مل",
  LITER: "لتر",
  GRAM: "جرام",
  KILOGRAM: "كيلوجرام",
} as const;

export type SIZES_UNITS = (typeof SIZES_UNITS)[keyof typeof SIZES_UNITS];
