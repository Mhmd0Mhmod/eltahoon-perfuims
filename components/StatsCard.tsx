import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StatsCardData } from "@/types";
import { cloneElement, isValidElement } from "react";

interface StatsCardProps extends StatsCardData {}

function StatsCard({ title, icon, value, description }: StatsCardProps) {
  const styledIcon = isValidElement(icon)
    ? cloneElement(icon, {
        className: cn("h-5 w-5 text-muted-foreground", icon.props.className),
      })
    : icon;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>

        {styledIcon}
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold">{value}</div>

        {description && (
          <p className="text-muted-foreground text-xs">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

export default StatsCard;
