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
      designation: z.string(),
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

export const VolunteerValidation = {
  createVolunteerValidationSchema,
};
