import { z } from 'zod';

const createDonationZodSchema = z.object({
  body: z.object({
    user: z.string({
      required_error: 'user id is required',
    }),
    image: z.string({
      required_error: ' photo is requied',
    }),
    amount: z.string({
      required_error: ' amount is requied',
    }),
    category: z.string({
      required_error: ' category is requied',
    }),
    title: z.string({
      required_error: ' title is requied',
    }),
    description: z.string({
      required_error: ' description is requied',
    }),
  }),
});

const updateDonationZodSchema = z.object({
  body: z.object({
    user: z.string().optional(),
    image: z.string().optional(),
    amount: z.string().optional(),
    category: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const DonationValidation = {
  createDonationZodSchema,
  updateDonationZodSchema,
};
