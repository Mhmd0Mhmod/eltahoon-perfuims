import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type AvatarSize = "sm" | "md" | "lg";

interface UserAvatarProps {
  name?: string;
  size?: AvatarSize;
  className?: string;
  url?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-16 w-16",
};

export function UserAvatar({
  name,
  url,
  size = "md",
  className,
}: UserAvatarProps) {
  const initials = name ? name.charAt(0).toUpperCase() : "U";

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      {url && <AvatarImage src={url} alt={name || "User avatar"} />}
      <AvatarFallback className="bg-primary/10 text-primary">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
