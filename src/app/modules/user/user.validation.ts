import { z } from 'zod';
import { role } from './user.constant';

const createUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    email: z.string({
      required_error: 'email is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
    role: z
      .enum(role, {
        required_error: 'role is required',
      })
      .optional(),
    phoneNumber: z.string({
      required_error: 'phone number is required',
    }),
    address: z.string({
      required_error: 'address is required',
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
