import { Result } from "@/common/either";
import { emailValidator } from "@/server/utils/email-validator";
import { CREATE_CONTACT_ERRORS } from "../errors/contact";
import { phoneRegex } from "@/common/regex";

type Props = {
  id?: number;
  name: string;
  email?: string;
  phone: string;
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

  get phone() {
    return this.props.phone;
  }

  static create(props: Props) {
    const { name, email, phone } = props;

    const trimmedName = name?.trim();
    const trimmedEmail = email?.trim();
    const trimmedPhone = phone?.trim();

    if (!trimmedName) {
      return Result.fail(CREATE_CONTACT_ERRORS.NAME_IS_REQUIRED);
    }

    if (!!trimmedEmail) {
      const { success: isValidEmail } = emailValidator(trimmedEmail);
      if (!isValidEmail) {
        return Result.fail(CREATE_CONTACT_ERRORS.EMAIL_IS_INVALID);
      }
    }

    if (!trimmedPhone) {
      return Result.fail(CREATE_CONTACT_ERRORS.PHONE_IS_REQUIRED);
    }

    const invalidPhoneLength =
      trimmedPhone.length < 10 || trimmedPhone.length > 15;
    const invalidPhone = phoneRegex.test(trimmedPhone) === false;
    if (invalidPhoneLength || invalidPhone) {
      return Result.fail(CREATE_CONTACT_ERRORS.PHONE_IS_INVALID);
    }

    const contact = new Contact({
      ...props,
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
    });
    return Result.ok<Contact>(contact);
  }
}
