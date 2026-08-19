"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Roles } from "@/enums/roles";
import { UserAvatar } from "@/features/users/components/UserAvatar";
import { ICustomer } from "@/features/users/types";
import TableDashboardPage from "@/features/dashboard/components/TableDashboardPage";
import { Column } from "@/types";
import { TPaginationParams } from "@/types/pagination";
import { formatDate } from "date-fns";
import { Calendar, Eye, Mail, Phone, Shield, UserCog } from "lucide-react";
import Link from "next/link";
import { getAdminUsers } from "@/features/users/services";

const columns: Column<ICustomer>[] = [
  {
    title: "العميل",
    render(row) {
      return (
        <Link
          href={`/dashboard/customers/${row.id}`}
          className="flex items-center gap-3"
        >
          <UserAvatar name={row.fullName} size="sm" />

          <div className="text-right hover:underline">
            <div className="font-medium">{row.fullName}</div>
            <div className="text-muted-foreground text-sm">@{row.username}</div>
          </div>
        </Link>
      );
    },
  },

  {
    title: "معلومات التواصل",
    render(row) {
      return (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <span dir="ltr">{row.email}</span>
            <Mail className="text-muted-foreground h-3.5 w-3.5" />
          </div>

          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <span dir="ltr">{row.phoneNumber}</span>
            <Phone className="h-3.5 w-3.5" />
          </div>
        </div>
      );
    },
  },

  {
    header: "role",
    title: "الدور",
    render(row) {
      const isAdmin = row.role === Roles.ADMIN;

      return (
        <Badge variant={isAdmin ? "default" : "secondary"} className="gap-1">
          {isAdmin && <Shield className="h-3 w-3" />}
          {isAdmin ? "مدير" : "مستخدم"}
        </Badge>
      );
    },
  },

  {
    header: "createdAt",
    title: "تاريخ التسجيل",
    render(row) {
      return (
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">
            {formatDate(row.createdAt, "dd/MM/yyyy")}
          </span>

          <Calendar className="text-muted-foreground h-4 w-4" />
        </div>
      );
    },
  },
];
function UsersPage() {
  return (
    <TableDashboardPage<ICustomer, TPaginationParams>
      title="العملاء"
      description="إدارة وعرض جميع العملاء المسجلين"
      table={{
        title: "قائمة العملاء",
        description: "إدارة وعرض جميع العملاء",
      }}
      columns={columns}
      params={{ page: 0 }}
      queryKey="customers"
      queryFn={getAdminUsers}
      emptyState={
        <div className="flex flex-col items-center justify-center py-12">
          <UserCog className="text-muted-foreground mb-4 h-12 w-12" />
          <h3 className="text-lg font-semibold">لا توجد بيانات عملاء</h3>
          <p className="text-muted-foreground text-sm">لا توجد نتائج لعرضها</p>
        </div>
      }
      isPaginated
    />
  );
}

export default UsersPage;
