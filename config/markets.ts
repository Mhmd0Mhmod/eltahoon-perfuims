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
export type Market = {
  code: string;
  name: string;
  currency: string;
  locale: string;
  flag: string;
};

export type MarketKey = keyof typeof markets;
