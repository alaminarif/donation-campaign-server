import * as z from 'zod';
import { Category, Status } from './campaign.constant';

const createCampaignZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    description: z.string().min(1, { message: 'Description is required' }),
    targetAmount: z.string().min(0, {
      message: 'Target amount is required and must be non-negative',
    }),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    currentAmount: z.string().min(0, {
      message: 'Current amount is required and must be non-negative',
    }),
    location: z.string().min(1, { message: 'Location is required' }),

    category: z.enum([...(Category as [string, ...string[]])]),
    status: z.enum([...(Status as [string, ...string[]])]),
    volunteerOpportunity: z.string().optional(),
    manager: z.string({
      required_error: 'manager is required',
    }),
    img: z.string({
      required_error: 'img is required',
    }),
    isDeleted: z.boolean().optional(),
  }),
});

const updateCampaignZodSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  targetAmount: z.number().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  currentAmount: z.number().optional(),
  location: z.string().optional(),

  category: z.enum([...(Category as [string, ...string[]])]).optional(),
  status: z.enum([...(Status as [string, ...string[]])]).optional(),
  volunteerOpportunity: z.string().optional(),
  manager: z.string().optional(),
  img: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

export const CampaignValidation = {
  createCampaignZodSchema,
  updateCampaignZodSchema,
};
