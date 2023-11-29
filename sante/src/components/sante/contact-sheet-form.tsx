"use client";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ContactForm } from "./contact-form/contact-form";
import type { ContactFormValues } from "./contact-form/contact-form";
import { api } from "@/trpc/react";
import { useMemo, useState } from "react";
import { Loading } from "./loading";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  trigger: React.ReactNode;
  contact?: {
    id: number;
    name: string;
    email?: string;
    phone: string;
  };
};

export const ContactSheetForm = ({ trigger, contact }: Props) => {
  const [open, setOpen] = useState(false);

  const trpcUtils = api.useUtils();
  const refreshQuery = () => trpcUtils.contact.getFiltered.refetch(undefined);

  const createMutation = api.contact.create.useMutation({
    onSuccess: async () => {
      await refreshQuery();
    },
  });
  const editMutation = api.contact.update.useMutation({
    onSuccess: async () => {
      await refreshQuery();
    },
  });

  const { toast } = useToast();

  const isLoading = useMemo(() => {
    return createMutation.isLoading || editMutation.isLoading;
  }, [createMutation.isLoading, editMutation.isLoading]);

  const handleSubmit = async (values: ContactFormValues) => {
    const email = !!values.email ? values.email : undefined;

    try {
      if (contact) {
        await editMutation.mutateAsync({
          id: contact.id,
          name: values.name,
          phone: values.phone,
          email: email,
        });

        toast({
          title: "Contact updated",
          description: `The contact ${values.name} was updated`,
        });
      } else {
        await createMutation.mutateAsync({
          name: values.name,
          phone: values.phone,
          email: email,
        });

        toast({
          title: "Contact created",
          description: `The contact ${values.name} was created`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `An error occurred while trying to save the contact`,
        variant: "destructive",
      });
    } finally {
      setOpen(false);
    }
  };

  const toggleSheet = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Sheet open={open}>
      <SheetTrigger asChild onClick={toggleSheet}>
        {trigger}
      </SheetTrigger>

      <SheetContent handleClose={toggleSheet}>
        <SheetHeader>
          <h1 className="text-2xl font-bold">
            {!contact?.id ? "Add a new contact" : "Editting contact"}
          </h1>
          {!contact?.id && (
            <SheetDescription className="mt-2">
              <p>your new contact will appear in your contact list.</p>
            </SheetDescription>
          )}
        </SheetHeader>

        <div className="mt-12">
          <ContactForm
            onSubmit={handleSubmit}
            defaultValues={contact}
            actions={
              <SheetFooter className="mt-4">
                <SheetClose asChild onClick={toggleSheet}>
                  <Button className="flex flex-1" variant="outline">
                    Cancel
                  </Button>
                </SheetClose>

                <Button
                  className="flex flex-1"
                  type="submit"
                  disabled={isLoading}
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
                    Save
                  </Loading>
                </Button>
              </SheetFooter>
            }
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
