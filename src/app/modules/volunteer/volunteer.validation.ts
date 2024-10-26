import { z } from 'zod';
import { BloodGroup, Days, Gender } from './volunteer.constant';

const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().max(20),
});

export const createVolunteerValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    volunteer: z.object({
      name: createUserNameValidationSchema,
      email: z.string().email(),
      contactNo: z.string(),
      gender: z.enum([...Gender] as [string, ...string[]]),
      dateOfBirth: z.string().optional(),
      address: z.string(),
      bloogGroup: z.enum([...BloodGroup] as [string, ...string[]]),
      skill: z.string(),
      abailability: z.enum([...Days] as [string, ...string[]]),
      preferredCampaigns: z.string(),
      startDate: z.string().datetime(),
      endDate: z.string().datetime(),
      hoursLogged: z.string(),
      profileImg: z.string(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().max(20),
});

const updateVolunteerValidationSchema = z.object({
  body: z.object({
    volunteer: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      bloogGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      address: z.string().optional(),
      skill: z.string(),
      abailability: z.enum([...Days] as [string, ...string[]]),
      preferredCampaigns: z.string().optional(),
      startDate: z.string().datetime().optional(),
      endDate: z.string().datetime().optional(),
      hoursLogged: z.string().optional(),
      // permanentAddress: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const VolunteerValidation = {
  createVolunteerValidationSchema,
  updateVolunteerValidationSchema,
};
