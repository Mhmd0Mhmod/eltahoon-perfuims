import { DirectionProvider } from "@/components/ui/direction";
import { Toaster } from "@/components/ui/toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Metadata } from "next";
import { Cairo, Playfair_Display } from "next/font/google";
import "./globals.css";
import { MarketProvider, QueryProvider } from "./providers";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "مؤسسه طاحون - المسك للعطور | Al-Tahoun Perfumes",
  description:
    "اكتشف عطور عربية فاخرة من مؤسسه طاحون - المسك للعطور. عود، عطور شرقية فاخرة مستوحاة من التراث العربي الأصيل | Discover exquisite Arabic perfumes, oud, and luxury fragrances from Al-Tahoun Establishment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${playfairDisplay.variable} ${cairo.variable} ${cairo.className} ${playfairDisplay.className} antialiased`}
      >
        <QueryProvider>
          <MarketProvider>
            <DirectionProvider direction="rtl">
              {children}
              <Toaster />
              <ReactQueryDevtools initialIsOpen={false} />
            </DirectionProvider>
          </MarketProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
