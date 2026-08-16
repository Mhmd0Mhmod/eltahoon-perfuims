import Header from "./_components/Header";
import PromoBanner from "./_components/PromoBanner";

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
