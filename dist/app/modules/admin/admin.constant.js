"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminFilterableFields = exports.adminSearchableFields = exports.role = void 0;
exports.role = ['user', 'admin'];
exports.adminSearchableFields = [
    'name.firstName',
    'name.lastName',
    'phoneNumber',
    'email',
    'address',
];
exports.adminFilterableFields = ['searchTerm', 'phoneNumber', 'email'];
