import type { ContactRepository } from "@/server/infra/database/repository";
import { Contact } from "../entities/contact";

export type ContactProps = {
  name: string;
  email?: string;
};

export class CreateContact {
  constructor(private readonly contactRepository: ContactRepository) {}

  execute = (props: ContactProps) => {
    const { name, email } = props;

    const contactOrError = Contact.create({
      name,
      email,
    });

    if (contactOrError.isFailure()) {
      return contactOrError.error;
    }

    const contact = contactOrError.value;
    const dbContact = this.contactRepository.create(contact);

    return dbContact;
  };
}
