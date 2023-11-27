import type { ContactRepository } from "@/server/infra/database/repository/contact-repository";
import { Result } from "@/common/either";
import { GET_CONTACT_ERRORS } from "../errors/contact";

export class DeleteContact {
  constructor(private readonly contactRepository: ContactRepository) {}

  execute = async (id: number) => {
    const contact = await this.contactRepository.getById(id);
    if (!contact) {
      return Result.fail(GET_CONTACT_ERRORS.CONTACT_NOT_FOUND);
    }

    const deleted = await this.contactRepository.delete(id);
    return deleted;
  };
}
