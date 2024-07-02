import { z } from 'zod';
import { role } from './user.constant';

const createUserZodSchema = z.object({
  body: z.object({
    // email: z.string({
    //   required_error: 'email is required',
    // }),
    password: z
      .string({
        required_error: 'Password is Required',
        invalid_type_error: 'string must be string',
      })
      .max(20, { message: 'Password can not be more than 20 characters' }),

    // isDeleted: z.boolean().optional().default(false),
  }),
});

// const createAdminZodSchema = z.object({
//   body: z.object({
//     password: z.string({
//       required_error: 'password is required',
//     }),
//     admin: z.object({
//       name: z.object({
//         firstName: z.string({
//           required_error: 'First name is required',
//         }),
//         lastName: z.string({
//           required_error: 'Last name is required',
//         }),
//       }),
//       email: z.string({
//         required_error: 'email is required',
//       }),

//       role: z
//         .enum(role, {
//           required_error: 'role is required',
//         })
//         .optional(),
//       phoneNumber: z.string({
//         required_error: 'phone number is required',
//       }),
//     }),
//   }),
// });

// const createAdminZodSchema = z.object({
//   body: z.object({
//     password: z.string(),

//     admin: z.object({
//       name: z.object({
//         firstName: z.string({
//           required_error: 'First name is required',
//         }),
//         lastName: z.string({
//           required_error: 'Last name is required',
//         }),
//         middleName: z.string().optional(),
//       }),

//       email: z
//         .string({
//           required_error: 'Email is required',
//         })
//         .email(),

//       password: z.string({
//         required_error: 'password number is required',
//       }),
//       phoneNumber: z.string({
//         required_error: 'Contact number is required',
//       }),
//     }),
//   }),
// });

const updateProfileZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    role: z.enum(role).optional(),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateProfileZodSchema,
};
