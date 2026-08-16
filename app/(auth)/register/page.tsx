import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import RegisterForm from "@/features/auth/components/RegisterForm";
import Link from "next/link";

function page() {
  return (
    <>
      <CardHeader className="text-right">
        <CardTitle className="text-2xl font-bold">
          انضم إلى عالم العطور الفاخرة
        </CardTitle>

        <CardDescription className="text-muted-foreground text-right text-sm">
          انضم إلى مجتمعنا واستمتع بتجربة تسوق فريدة لعشاق العطور.
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-4 max-h-[60vh] overflow-y-auto">
        <RegisterForm />
      </CardContent>
      <Separator />
      <CardFooter className="flex-col gap-4">
        <div className="text-muted-foreground text-center text-sm">
          لديك حساب؟
          <Button variant="link" className="ml-2 p-0">
            <Link href="/login">تسجيل الدخول</Link>
          </Button>
        </div>
      </CardFooter>
    </>
  );
}
export default page;
