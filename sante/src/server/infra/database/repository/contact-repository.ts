import type { Pagination } from "@/common/types";
import { db } from "../prisma-client";
import { PAGINATION } from "@/common/constants";

type CreateProps = {
  name: string;
  email?: string;
  phone: string;
};

type UpdateProps = {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
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
      data: {
        name: contact.name,
        email: contact.email ?? null,
        phone: contact.phone,
      },
    });
  }

  async update(contact: UpdateProps) {
    const { id, ...data } = contact;

    return await db.contact.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email ?? null,
        phone: data.phone,
      },
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

    const isFilterEmpty = !trimmed;

    if (isFilterEmpty) {
      return await db.contact.findMany({
        skip: pagination?.skip ?? PAGINATION.SKIP,
        take: pagination?.take ?? PAGINATION.TAKE,
      });
    }

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
