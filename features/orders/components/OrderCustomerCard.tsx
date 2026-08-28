import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, MapPin, Phone, User } from "lucide-react";
import { IOrder } from "../types";

interface OrderCustomerCardProps {
  user: IOrder["user"];
  shippingAddress?: string | null;
  phoneNumber?: string | null;
}

export function OrderCustomerCard({
  user,
  shippingAddress,
  phoneNumber,
}: OrderCustomerCardProps) {
  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          بيانات العميل
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <InfoRow icon={User} label="الاسم" value={user.name} />
          <InfoRow icon={Mail} label="البريد الإلكتروني" value={user.email} />
          <InfoRow
            icon={Phone}
            label="رقم الهاتف"
            value={user.phoneNumber || phoneNumber || "غير محدد"}
          />
          <Separator />
          <InfoRow
            icon={MapPin}
            label="عنوان الشحن"
            value={shippingAddress || user.shippingAddress || "غير محدد"}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="text-muted-foreground mt-0.5 h-5 w-5" />
      <div>
        <p className="text-muted-foreground text-sm">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
