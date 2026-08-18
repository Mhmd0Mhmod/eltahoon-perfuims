"use client";

import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ClassNameValue } from "tailwind-merge";
interface ActiveLinkProps extends LinkProps {
  children?: React.ReactNode;
  className?: ClassNameValue;
}
function ActiveLink({ href, children, ...props }: ActiveLinkProps) {
  const pathName = usePathname();
  const isActive = pathName === href;
  return (
    <Link
      href={href}
      {...props}
      className={cn(
        props.className,
        isActive && "bg-primary/10 text-primary rounded-md ",
      )}
    >
      {children}
    </Link>
  );
}
export default ActiveLink;
