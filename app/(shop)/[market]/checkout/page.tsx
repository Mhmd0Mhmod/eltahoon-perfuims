// import CheckoutForm from "@/components/shop/checkout/CheckoutForm";
// import { CartAPI } from "@/lib/api/cart";
// import { CountryAPI } from "@/lib/api/country";
// import { auth } from "@/lib/auth";
// import { CreditCard } from "lucide-react";
// import { redirect } from "next/navigation";

// export default async function CheckoutPage() {
//   const [cartItems, user, country] = await Promise.all([
//     CartAPI.getCartServer(),
//     auth(),
//     CountryAPI.getCurrentCountryServer(),
//   ]);

//   if (cartItems.length === 0) {
//     redirect("/products");
//   }

//   return (
//     <div className="container mx-auto px-4 py-10 md:px-6">
//       <div className="mb-8 space-y-2 text-center">
//         <h1 className="text-3xl font-bold tracking-tight md:text-4xl">إتمام الطلب</h1>
//         <p className="text-muted-foreground">قم بتعبئة معلومات الشحن لإتمام عملية الشراء</p>
//       </div>

//       <div className="mx-auto max-w-7xl">
//         <CheckoutForm cartItems={cartItems} user={user?.user} country={country!} />
//       </div>

//       <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center">
//         <div className="text-muted-foreground flex items-center gap-2 text-sm">
//           <CreditCard className="h-4 w-4" />
//           <span>تشفير آمن بنسبة 100% لمعلوماتك</span>
//         </div>
//         <p className="text-muted-foreground max-w-md text-xs">
//           بالنقر على &quot;إتمام الشراء&quot;، فإنك توافق على شروط الخدمة وسياسة الخصوصية الخاصة
//           بمتجرنا.
//         </p>
//       </div>
//     </div>
//   );
// }
function page() {
  return <div>page</div>;
}
export default page;
