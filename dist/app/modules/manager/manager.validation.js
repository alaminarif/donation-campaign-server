"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerValidation = exports.createManagerValidationSchema = void 0;
const zod_1 = require("zod");
const manager_constant_1 = require("./manager.constant");
const createUserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(20),
    lastName: zod_1.z.string().max(20),
});
exports.createManagerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20),
        manager: zod_1.z.object({
            name: createUserNameValidationSchema,
            email: zod_1.z.string().email(),
            contactNo: zod_1.z.string(),
            gender: zod_1.z.enum([...manager_constant_1.Gender]),
            dateOfBirth: zod_1.z.string().optional(),
            bloogGroup: zod_1.z.enum([...manager_constant_1.BloodGroup]),
            address: zod_1.z.string(),
            profileImg: zod_1.z.string(),
        }),
    }),
});
const updateUserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(20).optional(),
    lastName: zod_1.z.string().max(20).optional(),
});
const updateManagerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        manager: zod_1.z.object({
            name: updateUserNameValidationSchema,
            gender: zod_1.z.enum([...manager_constant_1.Gender]).optional(),
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z.string().email().optional(),
            contactNo: zod_1.z.string().optional(),
            bloogGroup: zod_1.z.enum([...manager_constant_1.BloodGroup]).optional(),
            address: zod_1.z.string().optional(),
            // permanentAddress: z.string().optional(),
            profileImg: zod_1.z.string().optional(),
        }),
    }),
});
exports.ManagerValidation = {
    createManagerValidationSchema: exports.createManagerValidationSchema,
    updateManagerValidationSchema,
};
