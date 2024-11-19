import { z } from 'zod';
import { BloodGroup, Gender } from './admin.constant';

const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().max(20),
});

export const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    admin: z.object({
      name: createUserNameValidationSchema,
      email: z.string().email(),
      contactNo: z.string(),
      gender: z.enum([...Gender] as [string, ...string[]]),
      dateOfBirth: z.string().optional(),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]),
      address: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  lastName: z.string().max(20).optional(),
});

const updateAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      address: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const AdminValidation = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
