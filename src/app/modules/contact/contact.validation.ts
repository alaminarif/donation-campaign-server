import { z } from 'zod';

const createContactZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name' }),
    email: z.string({ required_error: 'email is required' }).email(),
    message: z.string({ required_error: 'message is required' }),
  }),
});

// const updatedContactSchema = z.object({
//   body: z.object({
//     name: z.string(),
//     email: z.string().email(),
//     message: z.string(),
//   }),
// });

export const ContactValidation = {
  createContactZodSchema,
};
