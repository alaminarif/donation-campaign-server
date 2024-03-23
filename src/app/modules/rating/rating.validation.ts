import { z } from 'zod';

const createRatingZodSchema = z.object({
  body: z.object({
    user: z.string({
      required_error: 'user is required',
    }),
    value: z.number({
      required_error: 'user is required',
    }),
  }),
});

export const RatingValidation = {
  createRatingZodSchema,
};
