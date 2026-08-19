import { UserAvatar } from "@/features/users/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { formatDate } from "date-fns";
import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  Settings,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface AccountProfileHeroProps {
  user: {
    fullName?: string | null;
    username: string;
    email: string;
    phoneNumber?: string | null;
    address?: string | null;
    createdAt: string | Date;
  };
}

function AccountProfileHero({ user }: AccountProfileHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="from-primary/20 via-primary/10 to-background absolute inset-0 bg-linear-to-br" />

      <div className="bg-primary/5 absolute -top-24 -right-24 h-48 w-48 rounded-full blur-3xl" />

      <div className="bg-secondary/10 absolute -bottom-24 -left-24 h-48 w-48 rounded-full blur-3xl" />

      <div className="relative p-6 sm:p-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <UserAvatar
            name={user.fullName || user.username}
            size="lg"
            className="h-24 w-24 border-4 border-white shadow-xl"
          />

          <UserInfo user={user} />

          <EditProfileButton />
        </div>
      </div>
    </div>
  );
}

function UserInfo({ user }: { user: AccountProfileHeroProps["user"] }) {
  return (
    <div className="flex-1 text-center sm:text-right">
      <div className="mb-2 flex items-center justify-center gap-2 sm:justify-start">
        <h1 className="text-2xl font-bold sm:text-3xl">
          {user.fullName || user.username}
        </h1>

        <Sparkles className="text-primary h-5 w-5" />
      </div>

      <div className="text-muted-foreground mb-4 flex flex-wrap items-center justify-center gap-4 text-sm sm:justify-start">
        <ProfileInfoItem icon={Mail} value={user.email} />

        {user.phoneNumber && (
          <ProfileInfoItem icon={Phone} value={user.phoneNumber} />
        )}

        {user.address && <ProfileInfoItem icon={MapPin} value={user.address} />}

        <ProfileInfoItem
          icon={Calendar}
          value={`عضو منذ ${formatDate(
            new Date(user.createdAt),
            "dd MMM yyyy",
          )}`}
        />
      </div>
    </div>
  );
}

function ProfileInfoItem({
  icon: Icon,
  value,
}: {
  icon: React.ElementType;
  value: string;
}) {
  return (
    <span className="flex items-center gap-1">
      <Icon className="h-4 w-4" />
      {value}
    </span>
  );
}

function EditProfileButton() {
  return (
    <Button variant="outline" className="group shadow-sm">
      <Link href="/account/settings" className="flex items-center gap-2">
        <Settings className="h-4 w-4 transition-transform group-hover:rotate-90" />
        تعديل الملف الشخصي
      </Link>
    </Button>
  );
}

export default AccountProfileHero;
