"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationFilterableFields = exports.DonationSearchableFields = exports.Category = exports.PaymentMethod = void 0;
exports.PaymentMethod = [
    'Bank Transfer',
    'Credit Card',
    'PayPal',
    'Bkash',
    'Nagad',
];
exports.Category = ['One-time', 'Recurring'];
exports.DonationSearchableFields = ['amount', 'title', 'category'];
exports.DonationFilterableFields = ['searchTerm', 'category'];
