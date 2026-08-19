import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Calendar, Mail, MapPin, Phone, UserCog } from "lucide-react";

interface CustomerInfoCardProps {
  customer: {
    role: string;
    email: string;
    phoneNumber?: string | null;
    address?: string | null;
    createdAt: string | Date;
    updatedAt: string | Date;
  };
}

export function CustomerInfoCard({ customer }: CustomerInfoCardProps) {
  const roleInfo = ROLE_CONFIG[customer.role as keyof typeof ROLE_CONFIG];

  const RoleIcon = roleInfo.icon;

  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCog className="h-5 w-5" />
          معلومات الحساب
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className={cn("rounded-full p-2", roleInfo.bgColor)}>
              <RoleIcon className="h-4 w-4" />
            </div>

            <div className="flex-1">
              <p className="text-muted-foreground text-sm">الصلاحية</p>

              <p className="font-medium">{roleInfo.label}</p>
            </div>
          </div>

          <Separator />

          <InfoItem
            icon={Mail}
            label="البريد الإلكتروني"
            value={customer.email}
            breakAll
          />

          <InfoItem
            icon={Phone}
            label="رقم الهاتف"
            value={customer.phoneNumber || "غير محدد"}
          />

          <InfoItem
            icon={MapPin}
            label="العنوان"
            value={customer.address || "غير محدد"}
          />

          <Separator />

          <DateItem label="تاريخ التسجيل" date={customer.createdAt} />

          <DateItem label="آخر تحديث" date={customer.updatedAt} />
        </div>
      </CardContent>
    </Card>
  );
}
import { LucideIcon } from "lucide-react";
import { ROLE_CONFIG } from "../config";

interface InfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  breakAll?: boolean;
}

function InfoItem({ icon: Icon, label, value, breakAll }: InfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="text-muted-foreground mt-0.5 h-5 w-5" />

      <div className="flex-1">
        <p className="text-muted-foreground text-sm">{label}</p>

        <p className={cn("font-medium", breakAll && "break-all")}>{value}</p>
      </div>
    </div>
  );
}

function DateItem({ label, date }: { label: string; date: string | Date }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground text-sm">{label}</span>

      <div className="flex items-center gap-1">
        <Calendar className="text-muted-foreground h-4 w-4" />

        <span className="text-sm font-medium">
          {new Date(date).toLocaleDateString("ar-EG")}
        </span>
      </div>
    </div>
  );
}
