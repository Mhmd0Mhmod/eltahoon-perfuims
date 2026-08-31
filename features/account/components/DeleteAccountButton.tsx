"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteAccountAction } from "../../../app/(shop)/account/actions";

export default function DeleteAccountButton() {
  const router = useRouter();
  const { isPending, mutate: deleteAccount } = useMutation({
    mutationFn: deleteAccountAction,
    onSuccess: (data, _, __, ctx) => {
      if (!data.success) {
        toast.error(data.message || "تعذر حذف الحساب");
        return;
      }
      toast.success("تم حذف الحساب بنجاح");
      router.refresh();
      ctx.client.invalidateQueries();
    },
    onError: (error, _, __, ctx) => {
      toast.error("تعذر حذف الحساب");
    },
  });

  function handleDelete() {
    deleteAccount();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="w-full border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            حذف الحساب
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>تأكيد حذف الحساب</AlertDialogTitle>
          <AlertDialogDescription>
            هل أنت متأكد من رغبتك في حذف حسابك نهائيًا؟ لا يمكن التراجع عن هذا
            الإجراء وستفقد جميع بياناتك وطلباتك.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "جارٍ الحذف..." : "نعم، حذف الحساب"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
