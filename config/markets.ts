export const markets = {
  eg: {
    code: "EG",
    name: "Egypt",
    currency: "EGP",
    locale: "ar-EG",
    flag: "🇪🇬",
    key: "eg",
  },
  sa: {
    code: "SA",
    name: "Saudi Arabia",
    currency: "SAR",
    locale: "ar-SA",
    flag: "🇸🇦",
    key: "sa",
  },
} as const;
export type Market = {
  code: string;
  name: string;
  currency: string;
  locale: string;
  flag: string;
  key: MarketKey;
};

export type MarketKey = keyof typeof markets;
