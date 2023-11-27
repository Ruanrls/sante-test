import type { Pagination } from "@/common/types";
import { db } from "../prisma-client";
import { PAGINATION } from "@/common/constants";

type CreateProps = {
  name: string;
  email?: string;
};

type UpdateProps = {
  id: number;
  name?: string;
  email?: string;
};

type GetByFilterProps =
  | {
      filter?: string;
      pagination?: Pagination;
    }
  | undefined;

export class ContactRepository {
  async create(contact: CreateProps) {
    return await db.contact.create({
      data: contact,
    });
  }

  async update(contact: UpdateProps) {
    const { id, ...data } = contact;

    return await db.contact.update({
      where: { id },
      data,
    });
  }

  async getById(id: number) {
    return await db.contact.findUnique({
      where: { id },
    });
  }

  getByFilter = async (params: GetByFilterProps) => {
    if (!params) {
      return await db.contact.findMany({
        skip: PAGINATION.SKIP,
        take: PAGINATION.TAKE,
      });
    }

    const { filter, pagination } = params;
    const trimmed = filter?.trim();

    return await db.contact.findMany({
      where: {
        OR: [
          {
            name: {
              contains: trimmed,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: trimmed,
              mode: "insensitive",
            },
          },
        ],
      },
      skip: pagination?.skip ?? PAGINATION.SKIP,
      take: pagination?.take ?? PAGINATION.TAKE,
    });
  };

  async delete(id: number) {
    return await db.contact.delete({
      where: { id },
    });
  }
}
