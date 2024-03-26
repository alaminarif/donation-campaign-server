import { z } from 'zod';

const createPaymentZodSchema = z.object({
  body: z.object({
    user: z.string({
      required_error: 'user is required',
    }),
    amount: z.number({
      required_error: 'amount is required',
    }),
    donation: z.string({
      required_error: 'donation is required',
    }),
    transactionId: z.string({
      required_error: 'transactionId is required',
    }),
  }),
});

const updatedPaymentZodSchema = z.object({
  body: z.object({
    user: z.string()?.optional(),
    amount: z.number()?.optional(),
    donation: z.string()?.optional(),
    transactionId: z.string()?.optional(),
  }),
});

export const PaymentValidation = {
  createPaymentZodSchema,
  updatedPaymentZodSchema,
};
