import { z } from 'zod';

const createDonationCategoryZodSchema = z.object({
  body: z.object({
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
  }),
});

const updateDonationCategoryZodSchema = z.object({
  body: z.object({
    image: z.string().optional(),
    amount: z.string().optional(),
    category: z.string().optional(),
    title: z.string().optional(),
  }),
});

export const DonationCategoryValidation = {
  createDonationCategoryZodSchema,
  updateDonationCategoryZodSchema,
};
