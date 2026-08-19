import { Plus } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog as DialogComponent,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "./ui/separator";

interface FormDialogProps {
  title: string;
  description: string;
  children: ReactNode;
  icon?: ReactNode;
  triggerRender?: ReactNode;
  variant?: "default" | "outline" | "ghost" | "link" | "destructive";
}

function Dialog({
  title,
  description,
  children,
  icon,
  triggerRender,
  variant = "default",
}: FormDialogProps) {
  return (
    <DialogComponent modal>
      <DialogTrigger render={<Button variant={variant} />}>
        {triggerRender ? (
          triggerRender
        ) : (
          <>
            {icon ? icon : <Plus className="h-4 w-4" />}
            {title}
          </>
        )}
      </DialogTrigger>

      <DialogContent className="md:min-w-xl max-h-[80vh] overflow-y-auto  overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted/80 scrollbar-track-muted/20">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>

          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Separator />

        {children}
      </DialogContent>
    </DialogComponent>
  );
}

export default Dialog;
