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
const campaign_constant_1 = require("./campaign.constant");
const createCampaignZodSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required',
        }),
        description: z.string().min(1, { message: 'Description is required' }),
        targetAmount: z.string().min(0, {
            message: 'Target amount is required and must be non-negative',
        }),
        startDate: z.string().datetime(),
        endDate: z.string().datetime(),
        currentAmount: z.string().min(0, {
            message: 'Current amount is required and must be non-negative',
        }),
        location: z.string().min(1, { message: 'Location is required' }),
        category: z.enum([...campaign_constant_1.Category]),
        status: z.enum([...campaign_constant_1.Status]),
        volunteerOpportunity: z.string().optional(),
        manager: z.string({
            required_error: 'manager is required',
        }),
        img: z.string({
            required_error: 'img is required',
        }),
        isDeleted: z.boolean().optional(),
    }),
});
const updateCampaignZodSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    targetAmount: z.number().optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    currentAmount: z.number().optional(),
    location: z.string().optional(),
    category: z.enum([...campaign_constant_1.Category]).optional(),
    status: z.enum([...campaign_constant_1.Status]).optional(),
    volunteerOpportunity: z.string().optional(),
    manager: z.string().optional(),
    img: z.string().optional(),
    isDeleted: z.boolean().optional(),
});
exports.CampaignValidation = {
    createCampaignZodSchema,
    updateCampaignZodSchema,
};
