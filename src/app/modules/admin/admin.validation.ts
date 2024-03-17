import { z } from 'zod';
import { role } from './admin.constant';

const createAdminZodSchema = z.object({
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

const updateProfileZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    role: z.enum(role).optional(),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const AdminValidation = {
  createAdminZodSchema,
  updateProfileZodSchema,
};
