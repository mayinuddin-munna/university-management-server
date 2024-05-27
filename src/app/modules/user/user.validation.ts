import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .max(20, { message: "Password con't more then 20 characters" })
    .optional(),
});

export const UserValidation = {
  userValidationSchema,
};
