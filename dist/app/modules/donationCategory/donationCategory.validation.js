"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationCategoryValidation = void 0;
const zod_1 = require("zod");
const createDonationCategoryZodSchema = zod_1.z.object({
    body: zod_1.z.object({
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
    }),
});
const updateDonationCategoryZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        image: zod_1.z.string().optional(),
        amount: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        title: zod_1.z.string().optional(),
    }),
});
exports.DonationCategoryValidation = {
    createDonationCategoryZodSchema,
    updateDonationCategoryZodSchema,
};
