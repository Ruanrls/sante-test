import type { Pagination } from "@/common/types";
import type { ContactRepository } from "@/server/infra/database/repository";

type GetContactByFilterProps = {
  filter?: string;
  pagination?: Pagination;
};

export class GetContactByFilter {
  constructor(private readonly contactRepository: ContactRepository) {}

  execute = async (props: GetContactByFilterProps) => {
    const { filter, pagination } = props;

    console.log("EU estou aqui -------> ", this);

    const contactList = await this.contactRepository.getByFilter({
      filter,
      pagination,
    });
    return contactList;
  };
}
