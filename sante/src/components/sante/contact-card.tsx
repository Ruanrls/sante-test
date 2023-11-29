"use client";
import { Button } from "@/components/ui/button";
import { DeleteContactDialog } from "./delete-contact-dialog";
import { CardWithHero } from "./card";
import { ContactSheetForm } from "./contact-sheet-form";

type Props = {
  contact: {
    id: number;
    name: string;
    email: string | null;
    phone: string;
  };
};

export const ContactCard = ({ contact }: Props) => {
  return (
    <CardWithHero
      image={{
        src: "/assets/user-image.jpeg",
        alt: "Default user image (iguana)",
      }}
      title={contact.name}
      content={
        <>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col text-sm">
              <span className="text-sm font-bold">Phone:</span>
              <span>{contact.phone}</span>
            </div>
          </div>

          <div className="flex h-10 flex-col gap-2">
            {contact.email && (
              <div className="flex flex-col text-sm">
                <span className="text-sm font-bold">Email:</span>
                <span className="truncate">{contact.email}</span>
              </div>
            )}
          </div>
        </>
      }
      footer={
        <>
          <ContactSheetForm
            trigger={<Button className="flex flex-1">Edit</Button>}
            contact={{
              id: contact.id,
              name: contact.name,
              email: contact.email ?? undefined,
              phone: contact.phone,
            }}
          />
          <DeleteContactDialog
            id={contact.id}
            trigger={
              <Button className="flex flex-1" variant="destructive">
                Remove
              </Button>
            }
            onDelete={() => {
              console.log("deleting contact ", contact.id);
            }}
          />
        </>
      }
    />
  );
};
