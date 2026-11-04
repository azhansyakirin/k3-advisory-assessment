import { z } from "zod";

/**
 * this function is for validating string field
 */
export const validateString = (value, type) => {
  const schema = z
    .string()
    .trim()
    .min(1, `${type || 'This field'} is required`);

  const result = schema.safeParse(
    typeof value === 'string' ? value : ''
  );

  return result.success ? null : result.error.issues[0].message;
}