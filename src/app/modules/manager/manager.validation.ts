import { z } from 'zod';
import { BloodGroup, Gender } from './manager.constant';

const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().max(20),
});

export const createManagerValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    manager: z.object({
      designation: z.string(),
      name: createUserNameValidationSchema,
      email: z.string().email(),
      contactNo: z.string(),
      gender: z.enum([...Gender] as [string, ...string[]]),
      dateOfBirth: z.string().optional(),
      emergencyContactNo: z.string(),
      bloogGroup: z.enum([...BloodGroup] as [string, ...string[]]),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImg: z.string(),
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
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const ManagerValidation = {
  createManagerValidationSchema,
  updateProfileZodSchema,
};
