import { Plus } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog as DialogComponent,
  DialogContent as DialogContentComponent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger as DialogTriggerComponent,
} from "@/components/ui/dialog";
import { Separator } from "./ui/separator";
import { VariantProps } from "class-variance-authority";

interface FormDialogProps {
  children: ReactNode;
}

function Dialog({ children }: FormDialogProps) {
  return <DialogComponent modal>{children}</DialogComponent>;
}
interface DialogTriggerProps {
  variant?: VariantProps<typeof Button>["variant"];
  children: ReactNode;
}
function DialogTrigger({ variant = "default", children }: DialogTriggerProps) {
  return (
    <DialogTriggerComponent render={<Button variant={variant} />}>
      {children}
    </DialogTriggerComponent>
  );
}
interface DialogContentProps {
  title: string;
  description?: string;
  children: ReactNode;
}
function DialogContent({ title, description, children }: DialogContentProps) {
  return (
    <DialogContentComponent className="md:min-w-xl max-h-[80vh] overflow-y-auto  overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted/80 scrollbar-track-muted/20">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>

        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <Separator />

      {children}
    </DialogContentComponent>
  );
}
Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
export default Dialog;
