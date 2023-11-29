"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog";
import { api } from "@/trpc/react";
import { useToast } from "../ui/use-toast";
import Image from "next/image";
import { Loading } from "./loading";
import { Button } from "../ui/button";
import { useMemo } from "react";

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

  const isLoading = useMemo(
    () => deleteMutation.isLoading,
    [deleteMutation.isLoading],
  );

  const handleDelete = async () => {
    await deleteMutation.mutateAsync({
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
          <Button
            className="flex"
            type="button"
            variant="destructive"
            disabled={isLoading}
            onClick={handleDelete}
          >
            <Loading
              isLoading={isLoading}
              fallback={
                <Image
                  src="/icons/loader.svg"
                  alt="A SVG loader"
                  width={28}
                  height={28}
                />
              }
            >
              Delete
            </Loading>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
