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
exports.BlogValidation = void 0;
const z = __importStar(require("zod"));
const createBlogZodSchema = z.object({
    body: z.object({
        image: z.string({
            required_error: 'Image is required',
        }),
        title: z.string({
            required_error: 'Title is required',
        }),
        description: z.string({
            required_error: 'Description is required',
        }),
        date: z.string().refine(value => {
            return !value || !isNaN(Date.parse(value)); // Check if the value is a valid date string
        }, { message: 'Invalid date format for startDate' }),
        helpPeople: z.boolean({
            required_error: ' help People is required',
        }),
        role: z.string({
            required_error: 'Author is required',
        }),
        category: z.string({
            required_error: 'Author is required',
        }),
        comment: z.string({
            required_error: 'comment is required',
        }),
    }),
});
const updatedBlogZodSchema = z.object({
    body: z.object({
        image: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        date: z
            .string()
            .optional()
            .refine(value => {
            return !value || !isNaN(Date.parse(value)); // Check if the value is a valid date string
        }, { message: 'Invalid date format for startDate' }),
        helpPeople: z.boolean().optional(),
        role: z.string().optional(),
        category: z.string().optional(),
        comment: z.string().optional(),
    }),
});
exports.BlogValidation = {
    createBlogZodSchema,
    updatedBlogZodSchema,
};
