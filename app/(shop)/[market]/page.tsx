import BrandStory from "./_components/BrandStory";
import Categories from "./_components/Categories";
import Features from "./_components/Features";
import Hero from "./_components/Hero";
import Newsletter from "./_components/NewsLetter";
import Products from "./_components/Products";
import Testimonials from "./_components/Testimonials";

function page() {
  return (
    <main className="relative overflow-hidden bg-[radial-gradient(circle_at_10%_10%,rgba(201,162,84,0.12),transparent_30%),radial-gradient(circle_at_90%_30%,rgba(58,44,28,0.08),transparent_38%),linear-gradient(180deg,#f7f3ec_0%,#f3ede4_58%,#f7f3ec_100%)]">
      <div className="pointer-events-none absolute inset-0 opacity-35 bg-[linear-gradient(to_right,rgba(40,30,20,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(40,30,20,0.06)_1px,transparent_1px)] bg-size-[40px_40px]" />
      <Hero />
      <Categories />
      <BrandStory />
      <Products />
      <Features />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
export default page;
