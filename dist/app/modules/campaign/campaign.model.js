"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Campaign = void 0;
const mongoose_1 = require("mongoose");
const campaign_constant_1 = require("./campaign.constant");
const CampaignSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    targetAmount: {
        type: String,
        required: true,
    },
    currentAmount: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
        // default: Date.now,
    },
    endDate: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: {
            values: campaign_constant_1.Category,
            message: '{VALUE} is not a valid category',
        },
    },
    status: {
        type: String,
        enum: {
            values: campaign_constant_1.Status,
            message: '{VALUE} is not a valid status',
        },
    },
    volunteerOpportunity: {
        type: String,
    },
    manager: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Manager',
    },
    img: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.Campaign = (0, mongoose_1.model)('Campaign', CampaignSchema);
