import * as z from 'zod';

const createCampaignZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    description: z.string().min(1, { message: 'Description is required' }),
    targetAmount: z.string().min(0, {
      message: 'Target amount is required and must be non-negative',
    }),
    startDate: z.string().refine(
      value => {
        return !value || !isNaN(Date.parse(value)); // Check if the value is a valid date string
      },
      { message: 'Invalid date format for startDate' }
    ),
    endDate: z
      .string()
      .optional()
      .refine(
        value => {
          return !value || !isNaN(Date.parse(value)); // Check if the value is a valid date string
        },
        { message: 'Invalid date format for endDate' }
      ),
    currentAmount: z.string().min(0, {
      message: 'Current amount is required and must be non-negative',
    }),
    location: z.string().min(1, { message: 'Location is required' }),

    donationCategories: z.string({
      required_error: 'donationCategories is required',
    }),
  }),
});

const updateCampaignZodSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  targetAmount: z.number().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  currentAmount: z.number().optional(),
  location: z.string().optional(),
  donationCategories: z.array(z.string()).optional(),
});

export const CampaignValidation = {
  createCampaignZodSchema,
  updateCampaignZodSchema,
};
