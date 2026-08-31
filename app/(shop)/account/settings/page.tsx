import { getCurrentUser } from "@/app/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DeleteAccountButton from "@/features/account/components/DeleteAccountButton";
import { SettingsForm } from "@/features/account/components/SettingsForm";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="space-y-6">
      <div className="text-right">
        <h1 className="text-2xl font-bold tracking-tight">إعدادات الحساب</h1>
        <p className="text-muted-foreground">
          إدارة معلوماتك الشخصية وإعدادات حسابك
        </p>
      </div>

      <Card>
        <CardHeader className="text-right">
          <CardTitle>المعلومات الشخصية</CardTitle>
          <CardDescription>قم بتحديث معلوماتك الشخصية هنا</CardDescription>
        </CardHeader>
        <CardContent>
          <SettingsForm user={user} />
        </CardContent>
      </Card>

      <Card className="border-destructive/40">
        <CardHeader className="text-right">
          <CardTitle className="text-destructive">منطقة الخطر</CardTitle>
          <CardDescription>
            حذف حسابك نهائيًا. لا يمكن التراجع عن هذا الإجراء.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DeleteAccountButton />
        </CardContent>
      </Card>
    </div>
  );
}
