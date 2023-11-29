"use client";
import { ContactCard } from "@/components/sante/contact-card";
import { AddContactCard } from "@/components/sante/add-contact-card";
import { ContactSheetForm } from "@/components/sante/contact-sheet-form";

import { api } from "@/trpc/react";

type Props = {
  initialContacts: {
    id: number;
    name: string;
    email: string | null;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export const ContactList = ({ initialContacts }: Props) => {
  const contactsQuery = api.contact.getFiltered.useQuery(undefined, {
    initialData: initialContacts,
  });

  return (
    <div className="mt-4 grid w-full auto-rows-max grid-cols-4 flex-wrap gap-x-12 gap-y-12">
      <div className="cursor-pointer transition-transform duration-200 hover:scale-105">
        <ContactSheetForm
          trigger={
            <div>
              <AddContactCard />
            </div>
          }
        />
      </div>
      {contactsQuery.data?.map((contact) => (
        <div
          key={contact.id}
          className="transition-transform duration-200 hover:scale-105"
        >
          <ContactCard contact={contact} />
        </div>
      ))}
    </div>
  );
};
