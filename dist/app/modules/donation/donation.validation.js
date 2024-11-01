"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationValidation = void 0;
const zod_1 = require("zod");
const donation_constant_1 = require("./donation.constant");
const createDonationZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        amount: zod_1.z.string({
            required_error: ' amount is requied',
        }),
        paymentMethod: zod_1.z.enum([...donation_constant_1.PaymentMethod]),
        date: zod_1.z.string().datetime().optional(),
        category: zod_1.z.enum([...donation_constant_1.Category]),
        anonymous: zod_1.z.boolean().optional(),
        message: zod_1.z.string({
            required_error: ' message is requied',
        }),
        campaign: zod_1.z.string({
            required_error: 'campaign id is required',
        }),
        donor: zod_1.z.string({
            required_error: 'donor id is required',
        }),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
const updateDonationZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        amount: zod_1.z.string().optional(),
        paymentMethod: zod_1.z
            .enum([...donation_constant_1.PaymentMethod])
            .optional(),
        date: zod_1.z.string().datetime().optional(),
        category: zod_1.z.enum([...donation_constant_1.Category]).optional(),
        anonymous: zod_1.z.boolean().optional(),
        message: zod_1.z.string().optional(),
        campaign: zod_1.z.string().optional(),
        donor: zod_1.z.string().optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.DonationValidation = {
    createDonationZodSchema,
    updateDonationZodSchema,
};
