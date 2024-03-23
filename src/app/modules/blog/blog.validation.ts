import * as z from 'zod';

const createBlogZodSchema = z.object({
  body: z.object({
    image: z.string({
      required_error: 'Image is required',
    }),
    title: z.string({
      required_error: 'Title is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    date: z.string().refine(
      value => {
        return !value || !isNaN(Date.parse(value)); // Check if the value is a valid date string
      },
      { message: 'Invalid date format for startDate' }
    ),
    helpPeople: z.boolean({
      required_error: ' help People is required',
    }),
    author: z.string({
      required_error: 'Author is required',
    }),
    comment: z.string({
      required_error: 'comment is required',
    }),
  }),
});

const updatedBlogZodSchema = z.object({
  body: z.object({
    image: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    date: z
      .string()
      .optional()
      .refine(
        value => {
          return !value || !isNaN(Date.parse(value)); // Check if the value is a valid date string
        },
        { message: 'Invalid date format for startDate' }
      ),
    helpPeople: z.boolean().optional(),
    author: z.string().optional(),
    comment: z.string().optional(),
  }),
});

export const BlogValidation = {
  createBlogZodSchema,
  updatedBlogZodSchema,
};
