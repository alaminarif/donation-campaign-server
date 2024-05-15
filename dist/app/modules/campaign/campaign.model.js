"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Campaign = void 0;
const mongoose_1 = require("mongoose");
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
    startDate: {
        type: Date,
        required: true,
        // default: Date.now,
    },
    endDate: {
        type: Date,
        // required: true,
    },
    currentAmount: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    donationCategories: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'DonationCategory',
    },
}, {
    timestamps: true,
});
exports.Campaign = (0, mongoose_1.model)('Campaign', CampaignSchema);
