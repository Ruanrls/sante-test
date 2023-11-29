import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { GetContactByFilter } from "@/server/domain/services/get-contact-by-filter";
import { DeleteContact } from "@/server/domain/services/delete-contact";
import { CreateContact } from "@/server/domain/services/create-contact";
import { UpdateContact } from "@/server/domain/services/update-contact";
import { ContactRepository } from "@/server/infra/database/repository";

const contactRepository = new ContactRepository();

const getFilteredContactsService = new GetContactByFilter(contactRepository);
const createContactService = new CreateContact(contactRepository);
const updateContactService = new UpdateContact(contactRepository);
const deleteContactService = new DeleteContact(contactRepository);

export const contactRouter = createTRPCRouter({
  getFiltered: publicProcedure
    .input(
      z
        .object({
          filter: z.string().optional(),
          pagination: z
            .object({
              page: z.number().optional(),
              pageSize: z.number().optional(),
            })
            .optional(),
        })
        .optional(),
    )
    .query(({ input }) =>
      getFilteredContactsService.execute({
        filter: input?.filter,
        pagination: {
          skip: input?.pagination?.page,
          take: input?.pagination?.pageSize,
        },
      }),
    ),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email().optional(),
        phone: z.string().min(10).max(15),
      }),
    )
    .mutation(async ({ input }) => createContactService.execute(input)),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1),
        email: z.string().email().optional(),
        phone: z.string().min(10).max(15),
      }),
    )
    .mutation(async ({ input }) => updateContactService.execute(input)),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => deleteContactService.execute(input.id)),
});
