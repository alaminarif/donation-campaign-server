import { z } from 'zod';
import { BloodGroup, Gender } from './donor.constant';

const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().max(20),
});

export const createDonorValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    donor: z.object({
      designation: z.string(),
      name: createUserNameValidationSchema,
      email: z.string().email(),
      contactNo: z.string(),
      gender: z.enum([...Gender] as [string, ...string[]]),
      dateOfBirth: z.string().optional(),
      bloogGroup: z.enum([...BloodGroup] as [string, ...string[]]),
      address: z.string(),
      profileImg: z.string(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().max(20),
});

const updateDonorValidationSchema = z.object({
  body: z.object({
    donor: z.object({
      name: updateUserNameValidationSchema,
      designation: z.string().max(30).optional(),
      gender: z.enum([...Gender] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      bloogGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      address: z.string().optional(),
      // permanentAddress: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const DonorValidation = {
  createDonorValidationSchema,
  updateDonorValidationSchema,
};
