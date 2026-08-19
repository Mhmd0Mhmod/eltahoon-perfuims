import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowLeft, LucideIcon } from "lucide-react";
import Link from "next/link";

interface QuickLinkCardProps {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
  bgColor: string;
  iconColor: string;
}

function QuickLinkCard({
  href,
  label,
  description,
  icon: Icon,
  bgColor,
  iconColor,
}: QuickLinkCardProps) {
  return (
    <Link href={href} className="group">
      <Card className="relative h-full overflow-hidden border-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="from-primary/10 to-secondary/10 absolute inset-0 bg-linear-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <CardHeader className="relative pb-3">
          <div className="flex items-center justify-between">
            <div className={`rounded-xl p-3 ${bgColor}`}>
              <Icon className={`h-6 w-6 ${iconColor}`} />
            </div>

            <ArrowLeft className="text-muted-foreground h-5 w-5 transition-transform group-hover:-translate-x-1" />
          </div>
        </CardHeader>

        <CardContent className="relative">
          <CardTitle className="mb-1 text-lg">{label}</CardTitle>

          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}

export default QuickLinkCard;
