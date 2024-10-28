import { z } from 'zod';
import { Category, PaymentMethod } from './donation.constant';

const createDonationZodSchema = z.object({
  body: z.object({
    amount: z.string({
      required_error: ' amount is requied',
    }),
    paymentMethod: z.enum([...(PaymentMethod as [string, ...string[]])]),
    date: z.string().datetime().optional(),
    category: z.enum([...(Category as [string, ...string[]])]),

    anonymous: z.boolean().optional(),
    message: z.string({
      required_error: ' message is requied',
    }),
    campaign: z.string({
      required_error: 'campaign id is required',
    }),
    donor: z.string({
      required_error: 'donor id is required',
    }),

    isDeleted: z.boolean().optional(),
  }),
});

const updateDonationZodSchema = z.object({
  body: z.object({
    amount: z.string().optional(),
    paymentMethod: z
      .enum([...(PaymentMethod as [string, ...string[]])])
      .optional(),
    date: z.string().datetime().optional(),
    category: z.enum([...(Category as [string, ...string[]])]).optional(),

    anonymous: z.boolean().optional(),
    message: z.string().optional(),
    campaign: z.string().optional(),
    donor: z.string().optional(),

    isDeleted: z.boolean().optional(),
  }),
});

export const DonationValidation = {
  createDonationZodSchema,
  updateDonationZodSchema,
};
