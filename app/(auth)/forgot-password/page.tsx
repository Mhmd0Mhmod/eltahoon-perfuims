import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";
import Link from "next/link";

function Page() {
  return (
    <>
      <CardHeader className="text-right">
        <CardTitle className="text-2xl font-bold">نسيت كلمة المرور</CardTitle>
        <CardDescription>
          أدخل بريدك الإلكتروني أو اسم المستخدم لاستعادة كلمة المرور
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
      <Separator />
      <CardFooter className="flex-col gap-4">
        <div className="text-muted-foreground text-center text-sm">
          تذكرت كلمة المرور؟
          <Button variant="link" className="ml-2 p-0">
            <Link href="/login">سجل دخولك الآن</Link>
          </Button>
        </div>
      </CardFooter>
    </>
  );
}
export default Page;
