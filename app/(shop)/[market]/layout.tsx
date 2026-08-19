import { markets } from "@/config/markets";
import Header from "./_components/Header";
import PromoBanner from "./_components/PromoBanner";
export async function generateStaticParams() {
  return Object.keys(markets).map((market) => ({
    market,
  }));
}
function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PromoBanner />
      <Header />
      {children}
    </>
  );
}
export default layout;
