"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationCategory = void 0;
const mongoose_1 = require("mongoose");
const DonationCategorySchema = new mongoose_1.Schema({
    image: {
        type: String,
        require: true,
    },
    amount: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
}, {
    timestamps: true,
});
exports.DonationCategory = (0, mongoose_1.model)('DonationCategory', DonationCategorySchema);
