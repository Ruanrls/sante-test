import { Result } from "@/common/either";
import { emailValidator } from "@/server/utils/email-validator";
import { CREATE_CONTACT_ERRORS } from "../errors/contact";

type Props = {
  id?: number;
  name: string;
  email?: string;
};

export class Contact {
  constructor(private readonly props: Props) {
    Object.freeze(this);
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  static create(props: Props) {
    const { name, email } = props;

    const trimmedName = name?.trim();
    const trimmedEmail = email?.trim();

    if (!trimmedName) {
      return Result.fail(CREATE_CONTACT_ERRORS.NAME_IS_REQUIRED);
    }

    if (!!trimmedEmail) {
      const { success: isValidEmail } = emailValidator(trimmedEmail);
      if (!isValidEmail) {
        return Result.fail(CREATE_CONTACT_ERRORS.EMAIL_IS_INVALID);
      }
    }

    const contact = new Contact({
      ...props,
      name: trimmedName,
      email: trimmedEmail,
    });
    return Result.ok<Contact>(contact);
  }
}
