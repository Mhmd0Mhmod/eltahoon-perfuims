import { Plus } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface FormDialogProps {
  title: string;
  description: string;
  children: ReactNode;
}

function FormDialog({ title, description, children }: FormDialogProps) {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>
        <Plus className="mr-2 h-4 w-4" />
        {title}
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>

          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
}

export default FormDialog;
