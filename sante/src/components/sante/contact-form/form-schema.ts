import { phoneRegex } from "@/common/regex";
import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(2, "Your name must be at least 2 characters long"),
  email: z
    .string()
    .email("Please enter a valid email")
    .or(z.literal(""))
    .optional(),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .max(15, "Please enter a valid phone number")
    .regex(phoneRegex, "Please enter a valid phone number"),
});
