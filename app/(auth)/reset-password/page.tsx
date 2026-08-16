import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";
import Link from "next/link";
import { redirect } from "next/navigation";

async function Page({
  searchParams,
}: {
  searchParams: Promise<{ t: string }>;
}) {
  const { t } = await searchParams;
  if (!t?.trim()) {
    redirect("/forgot-password");
  }

  return (
    <>
      <CardHeader className="text-right">
        <CardTitle className="text-2xl font-bold">
          إعادة تعيين كلمة المرور
        </CardTitle>
        <CardDescription>
          أدخل رمز التحقق الذي تم إرساله إلى بريدك الإلكتروني أو رقم هاتفك
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <ResetPasswordForm email={t} />
      </CardContent>
      <Separator />
      <CardFooter className="flex-col gap-4">
        <div className="text-muted-foreground text-center text-sm">
          لم تستلم الرمز؟
          <Button variant="link" className="ml-2 p-0">
            <Link href="/forgot-password">أعد إرسال الرمز</Link>
          </Button>
        </div>
      </CardFooter>
    </>
  );
}
export default Page;
