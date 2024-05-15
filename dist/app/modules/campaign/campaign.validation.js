"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignValidation = void 0;
const z = __importStar(require("zod"));
const createCampaignZodSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required',
        }),
        description: z.string().min(1, { message: 'Description is required' }),
        targetAmount: z.string().min(0, {
            message: 'Target amount is required and must be non-negative',
        }),
        startDate: z.string().refine(value => {
            return !value || !isNaN(Date.parse(value)); // Check if the value is a valid date string
        }, { message: 'Invalid date format for startDate' }),
        endDate: z
            .string()
            .optional()
            .refine(value => {
            return !value || !isNaN(Date.parse(value)); // Check if the value is a valid date string
        }, { message: 'Invalid date format for endDate' }),
        currentAmount: z.string().min(0, {
            message: 'Current amount is required and must be non-negative',
        }),
        location: z.string().min(1, { message: 'Location is required' }),
        donationCategories: z.string({
            required_error: 'donationCategories is required',
        }),
    }),
});
const updateCampaignZodSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    targetAmount: z.number().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    currentAmount: z.number().optional(),
    location: z.string().optional(),
    donationCategories: z.array(z.string()).optional(),
});
exports.CampaignValidation = {
    createCampaignZodSchema,
    updateCampaignZodSchema,
};
