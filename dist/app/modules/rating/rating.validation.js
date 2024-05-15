"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingValidation = void 0;
const zod_1 = require("zod");
const createRatingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string({
            required_error: 'user is required',
        }),
        value: zod_1.z.number({
            required_error: 'user is required',
        }),
    }),
});
exports.RatingValidation = {
    createRatingZodSchema,
};
