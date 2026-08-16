export const markets = {
  eg: {
    code: "EG",
    name: "Egypt",
    currency: "EGP",
    locale: "ar-EG",
    flag: "🇪🇬",
  },

  sa: {
    code: "SA",
    name: "Saudi Arabia",
    currency: "SAR",
    locale: "ar-SA",
    flag: "🇸🇦",
  },
} as const;

export type Market = keyof typeof markets;
