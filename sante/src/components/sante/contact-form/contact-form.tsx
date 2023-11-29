"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./form-schema";
import { Button } from "@/components/ui/button";
import { formatPhone } from "@/common/formatters";

export type ContactFormValues = z.infer<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: {
    name: string;
    email?: string;
    phone: string;
  };
  onSubmit: (data: ContactFormValues) => void;
  actions?: React.ReactNode;
};

export const ContactForm = ({ defaultValues, actions, onSubmit }: Props) => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      ...defaultValues,
    },
    reValidateMode: "onBlur",
  });

  const handleSubmit = (values: ContactFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="John Doe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="phone"
            rules={{
              required: "Phone is required",
              maxLength: 14,
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(event) =>
                      field.onChange(formatPhone(event.target.value))
                    }
                    placeholder="(31) 9432-1234"
                    maxLength={14}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="johndoe@gmail.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {actions ?? (
          <Button className="flex flex-1" type="submit">
            Save
          </Button>
        )}
      </form>
    </Form>
  );
};
