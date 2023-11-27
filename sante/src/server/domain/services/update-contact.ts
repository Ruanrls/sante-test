import { Result } from "@/common/either";
import type { ContactRepository } from "@/server/infra/database/repository";
import { GET_CONTACT_ERRORS } from "../errors/contact";
import { Contact } from "../entities/contact";

type UpdateContactProps = {
  id: number;
  name: string;
  email?: string;
};

export class UpdateContact {
  constructor(private readonly contactRepository: ContactRepository) {}

  execute = async (props: UpdateContactProps) => {
    const { id, name, email } = props;
    const contact = await this.contactRepository.getById(id);

    if (!contact) {
      return Result.fail(GET_CONTACT_ERRORS.CONTACT_NOT_FOUND);
    }

    const contactOrError = Contact.create({ name, email });
    if (contactOrError.isFailure()) {
      return Result.fail(contactOrError.error);
    }

    const toDTO = contactOrError.value;

    const updatedContact = await this.contactRepository.update({
      id,
      name: toDTO.name,
      email: toDTO.email,
    });

    return updatedContact;
  };
}
