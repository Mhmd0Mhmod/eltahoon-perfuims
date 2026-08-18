import {
  AlertDialog as AlertDialogComponent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
interface IProps {
  title: string;
  description: string;
  onConfirm: () => void;
  triggerRender?: React.ReactNode;
  triggerVariant?:
    | "destructive"
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  actionButtonText?: string;
}

function AlertDialog({
  title,
  description,
  onConfirm,
  triggerRender,
  triggerVariant,
  actionButtonText,
  onConfirm: handleConfirm,
}: IProps) {
  return (
    <AlertDialogComponent>
      <AlertDialogTrigger
        render={<Button variant={triggerVariant} size="sm" />}
      >
        {triggerRender ? triggerRender : <Trash2 className="h-4 w-4" />}
      </AlertDialogTrigger>

      <AlertDialogContent className="min-w-md border-2">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className={"text-wrap"}>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            {actionButtonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogComponent>
  );
}
export default AlertDialog;
