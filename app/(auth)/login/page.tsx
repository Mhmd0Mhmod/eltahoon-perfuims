import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import LoginForm from "@/features/auth/components/LoginForm";
import Link from "next/link";

function page() {
  return (
    <>
      <CardHeader className="text-right">
        <CardTitle className="text-2xl font-bold">تسجيل الدخول</CardTitle>
        <CardDescription>
          سجل دخولك للوصول إلى مجموعتنا المميزة من العطور
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <LoginForm />
      </CardContent>
      <Separator />
      <CardFooter className="flex-col gap-4">
        <div className="text-muted-foreground text-center text-sm">
          ليس لديك حساب؟
          <Button variant="link" className="ml-2 p-0">
            <Link href="/register">سجل الآن</Link>
          </Button>
        </div>
      </CardFooter>
    </>
  );
}
export default page;
