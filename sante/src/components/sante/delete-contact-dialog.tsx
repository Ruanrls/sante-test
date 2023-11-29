"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog";
import { api } from "@/trpc/react";
import { useToast } from "../ui/use-toast";

type Props = {
  id: number;
  trigger: React.ReactNode;
  onDelete?: () => void;
};

export const DeleteContactDialog = ({ trigger, onDelete, id }: Props) => {
  const { toast } = useToast();

  const trcpContext = api.useUtils();
  const deleteMutation = api.contact.delete.useMutation({
    onSuccess: async () => {
      await trcpContext.contact.getFiltered.refetch(undefined);
      toast({
        title: "Contact deleted",
        description: `The contact was deleted`,
        variant: "destructive",
      });
    },
  });

  const handleDelete = async () => {
    deleteMutation.mutate({
      id,
    });

    onDelete && onDelete();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this contact?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action is permanent and cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
