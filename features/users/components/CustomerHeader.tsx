import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { ROLE_CONFIG } from "../config";
import { UserAvatar } from "./UserAvatar";
import { formatDate } from "date-fns";

interface CustomerHeaderProps {
  customer: {
    fullName: string;
    username: string;
    role: string;
    createdAt: string | Date;
  };
}

export function CustomerHeader({ customer }: CustomerHeaderProps) {
  const roleInfo = ROLE_CONFIG[customer.role as keyof typeof ROLE_CONFIG];

  const RoleIcon = roleInfo.icon;

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="flex items-start gap-4">
        <Link href="/dashboard/customers">
          <Button variant="ghost" size="icon">
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>

        <div className="flex items-start gap-4">
          <UserAvatar name={customer.fullName} className="h-16 w-16 text-xl" />

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{customer.fullName}</h1>

              <Badge
                variant={roleInfo.variant}
                className="flex items-center gap-1"
              >
                <RoleIcon className="h-4 w-4" />
                {roleInfo.label}
              </Badge>
            </div>

            <p className="text-muted-foreground mt-1">@{customer.username}</p>

            <div className="text-muted-foreground mt-2 flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4" />

              <span>
                تاريخ التسجيل: {formatDate(customer.createdAt, "dd/MM/yyyy")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
