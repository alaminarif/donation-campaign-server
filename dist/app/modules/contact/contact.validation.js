"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactValidation = void 0;
const zod_1 = require("zod");
const createContactZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'name' }),
        email: zod_1.z.string({ required_error: 'email is required' }).email(),
        message: zod_1.z.string({ required_error: 'message is required' }),
    }),
});
// const updatedContactSchema = z.object({
//   body: z.object({
//     name: z.string(),
//     email: z.string().email(),
//     message: z.string(),
//   }),
// });
exports.ContactValidation = {
    createContactZodSchema,
};
