"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VolunteerValidation = exports.createVolunteerValidationSchema = void 0;
const zod_1 = require("zod");
const volunteer_constant_1 = require("./volunteer.constant");
const createUserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(20),
    lastName: zod_1.z.string().max(20),
});
exports.createVolunteerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20),
        volunteer: zod_1.z.object({
            name: createUserNameValidationSchema,
            email: zod_1.z.string().email(),
            contactNo: zod_1.z.string(),
            gender: zod_1.z.enum([...volunteer_constant_1.Gender]),
            dateOfBirth: zod_1.z.string().optional(),
            address: zod_1.z.string(),
            bloodGroup: zod_1.z.enum([...volunteer_constant_1.BloodGroup]),
            skill: zod_1.z.string(),
            abailability: zod_1.z.enum([...volunteer_constant_1.Days]),
            preferredCampaigns: zod_1.z.string(),
            startDate: zod_1.z.string().datetime(),
            endDate: zod_1.z.string().datetime(),
            hoursLogged: zod_1.z.string(),
            profileImg: zod_1.z.string().optional(),
        }),
    }),
});
const updateUserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(20).optional(),
    lastName: zod_1.z.string().max(20).optional(),
});
const updateVolunteerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        volunteer: zod_1.z.object({
            name: updateUserNameValidationSchema,
            gender: zod_1.z.enum([...volunteer_constant_1.Gender]).optional(),
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z.string().email().optional(),
            contactNo: zod_1.z.string().optional(),
            bloodGroup: zod_1.z.enum([...volunteer_constant_1.BloodGroup]).optional(),
            address: zod_1.z.string().optional(),
            skill: zod_1.z.string().optional(),
            abailability: zod_1.z.enum([...volunteer_constant_1.Days]).optional(),
            preferredCampaigns: zod_1.z.string().optional(),
            startDate: zod_1.z.string().datetime().optional(),
            endDate: zod_1.z.string().datetime().optional(),
            hoursLogged: zod_1.z.string().optional(),
            // permanentAddress: z.string().optional(),
            profileImg: zod_1.z.string().optional(),
        }),
    }),
});
exports.VolunteerValidation = {
    createVolunteerValidationSchema: exports.createVolunteerValidationSchema,
    updateVolunteerValidationSchema,
};
