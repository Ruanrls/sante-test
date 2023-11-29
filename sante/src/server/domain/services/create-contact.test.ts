import { describe, it, expect, vi } from "vitest";
import type { Mocked } from "vitest";

import { CreateContact } from "./create-contact";
import type { ContactRepository } from "@/server/infra/database/repository";
import { Result } from "@/common/either";
import { CREATE_CONTACT_ERRORS } from "../errors/contact";

void describe("CreateContact", async () => {
  const makeSut = () => {
    const mockedContactRepository = {
      create: vi.fn(),
    } as unknown as Mocked<ContactRepository>;

    const sut = new CreateContact(mockedContactRepository);
    return { sut, mockedContactRepository };
  };

  const props = {
    name: "Jack sparrow",
    email: "jacksparrow@gmail.com",
    phone: "3199999999",
  };
  void it("should create a contact", async () => {
    const { sut, mockedContactRepository } = makeSut();

    const mockedReturnvalue = { props, id: 1 };
    mockedContactRepository.create.mockResolvedValue(mockedReturnvalue as any);

    const value = await sut.execute(props);
    expect(value).toEqual(mockedReturnvalue);
  });

  void it("should not create a contact with invalid name", async () => {
    const { sut, mockedContactRepository } = makeSut();

    mockedContactRepository.create.mockResolvedValue(undefined as any);

    const value = await sut.execute({ ...props, name: "" });
    const failureResponse = Result.fail(CREATE_CONTACT_ERRORS.NAME_IS_REQUIRED);

    expect(value).toEqual(failureResponse.error);
  });

  void it("should not create a contact with invalid email", async () => {
    const { sut, mockedContactRepository } = makeSut();

    mockedContactRepository.create.mockResolvedValue(undefined as any);

    const value = await sut.execute({ ...props, email: "invalidemail" });
    const failureResponse = Result.fail(CREATE_CONTACT_ERRORS.EMAIL_IS_INVALID);

    expect(value).toStrictEqual(failureResponse.error);
  });

  void it("should create a contact with empty email", async () => {
    const { sut, mockedContactRepository } = makeSut();

    const mockedReturnvalue = { props: { ...props, email: "" }, id: 1 };
    mockedContactRepository.create.mockResolvedValue(mockedReturnvalue as any);

    const value = await sut.execute({ ...props, email: "" });
    expect(value).toStrictEqual(mockedReturnvalue);
  });
});
