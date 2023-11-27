import Zod from "zod";

export const emailValidator = (email: string) =>
  Zod.string().email().min(5).safeParse(email);
