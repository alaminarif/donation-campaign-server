import { z } from 'zod';

const createCommentZodSchema = z.object({
  body: z.object({
    user: z.string({
      required_error: 'user is required',
    }),
    content: z.string({
      required_error: 'content is required',
    }),
  }),
});

const updateCommentZodSchema = z.object({
  body: z
    .object({
      user: z.string().optional(),
      content: z.string().optional(),
    })
    .optional(),
});

export const CommentValidation = {
  createCommentZodSchema,
  updateCommentZodSchema,
};
