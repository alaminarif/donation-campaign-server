"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentValidation = void 0;
const zod_1 = require("zod");
const createCommentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string({
            required_error: 'user is required',
        }),
        content: zod_1.z.string({
            required_error: 'content is required',
        }),
        email: zod_1.z.string({
            required_error: 'email is required',
        }),
    }),
});
const updateCommentZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        user: zod_1.z.string().optional(),
        content: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
    })
        .optional(),
});
exports.CommentValidation = {
    createCommentZodSchema,
    updateCommentZodSchema,
};
