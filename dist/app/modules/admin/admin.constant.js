"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminFilterableFields = exports.AdminSearchableFields = exports.BloodGroup = exports.Gender = void 0;
exports.Gender = ['male', 'female', 'other'];
exports.BloodGroup = [
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
];
exports.AdminSearchableFields = [
    'name.firstName',
    'name.lastName',
    'phoneNumber',
    'email',
    'address',
];
exports.adminFilterableFields = ['searchTerm', 'phoneNumber', 'email'];
