import { validateEmail } from "./validateEmail";
import { validateString } from "./validateString";

/**
 * this function is to validate the enquiry fields
 */
export const validateEnquiry = (formData) => {
  const errors = {};

  const nameError = validateString(formData.name, "Name");
  const emailError = validateEmail(formData.email);
  const messageError = validateString(formData.message, "Message");

  if (nameError) errors.name = nameError;
  if (emailError) errors.email = emailError;
  if (messageError) errors.message = messageError;

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim()
    }
  };

}