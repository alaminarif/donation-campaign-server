"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Donation = void 0;
const mongoose_1 = require("mongoose");
const donation_constant_1 = require("./donation.constant");
const DonationSchema = new mongoose_1.Schema({
    amount: {
        type: String,
        require: true,
    },
    paymentMethod: {
        type: String,
        enum: donation_constant_1.PaymentMethod,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    category: {
        type: String,
        require: true,
    },
    anonymous: {
        type: Boolean,
        default: false,
    },
    // title: {
    //   type: String,
    //   require: true,
    // },
    message: {
        type: String,
        required: true,
    },
    campaign: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Campaign',
        required: true,
    },
    donor: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Donor',
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.Donation = (0, mongoose_1.model)('Donation', DonationSchema);
