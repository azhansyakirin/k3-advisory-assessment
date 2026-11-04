import { z } from 'zod';

/**
 * this function is for validating email field 
 */
export const validateEmail = (value) => {
  const schema = z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address");

  const result = schema.safeParse(
    typeof value === 'string' ? value : ''
  );

  return result.success ? null : result.error.issues[0].message;
}