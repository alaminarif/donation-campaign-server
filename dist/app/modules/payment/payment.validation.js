"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentValidation = void 0;
const zod_1 = require("zod");
const createPaymentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string({
            required_error: 'user is required',
        }),
        amount: zod_1.z.number({
            required_error: 'amount is required',
        }),
        donation: zod_1.z.string({
            required_error: 'donation is required',
        }),
        transactionId: zod_1.z.string({
            required_error: 'transactionId is required',
        }),
    }),
});
const updatedPaymentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: (_a = zod_1.z.string()) === null || _a === void 0 ? void 0 : _a.optional(),
        amount: (_b = zod_1.z.number()) === null || _b === void 0 ? void 0 : _b.optional(),
        donation: (_c = zod_1.z.string()) === null || _c === void 0 ? void 0 : _c.optional(),
        transactionId: (_d = zod_1.z.string()) === null || _d === void 0 ? void 0 : _d.optional(),
    }),
});
exports.PaymentValidation = {
    createPaymentZodSchema,
    updatedPaymentZodSchema,
};
