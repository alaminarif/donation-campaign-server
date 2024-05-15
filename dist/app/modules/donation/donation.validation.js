"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationValidation = void 0;
const zod_1 = require("zod");
const createDonationZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string({
            required_error: 'user id is required',
        }),
        image: zod_1.z.string({
            required_error: ' photo is requied',
        }),
        amount: zod_1.z.string({
            required_error: ' amount is requied',
        }),
        category: zod_1.z.string({
            required_error: ' category is requied',
        }),
        title: zod_1.z.string({
            required_error: ' title is requied',
        }),
        description: zod_1.z.string({
            required_error: ' description is requied',
        }),
    }),
});
const updateDonationZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        amount: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
    }),
});
exports.DonationValidation = {
    createDonationZodSchema,
    updateDonationZodSchema,
};
