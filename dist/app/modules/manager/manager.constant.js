"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.managerFilterableFields = exports.managerSearchableFields = exports.BloodGroup = exports.Gender = void 0;
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
exports.managerSearchableFields = [
    'name.firstName',
    'name.lastName',
    'phoneNumber',
    'email',
    'address',
];
exports.managerFilterableFields = ['searchTerm', 'phoneNumber', 'email'];
