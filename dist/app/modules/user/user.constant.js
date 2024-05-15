"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFilterableFields = exports.userSearchableFields = exports.role = void 0;
exports.role = ['user', 'admin'];
exports.userSearchableFields = [
    'name.firstName',
    'name.lastName',
    'phoneNumber',
    'email',
    'address',
];
exports.userFilterableFields = ['searchTerm', 'phoneNumber', 'email'];
