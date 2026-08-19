import { LucideIcon } from "lucide-react";
import { ReactElement, ReactNode } from "react";

export type Title = {
  title: string;
};

export type Description = {
  description: string;
};
export type Column<T> = Title & {
  id?: string;
  header?: keyof T;
  render?: (row: T) => React.ReactNode;
  valueFormatter?: (row: T) => string | number | boolean | null | undefined;
};

export type StatsCardData = Title &
  Partial<Description> & {
    value: string | number;
    icon: ReactElement<{ className?: string }>;
  };
