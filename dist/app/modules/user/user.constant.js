"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFilterableFields = exports.UserStatus = exports.userSearchableFields = exports.Role = exports.USER_ROLE = void 0;
exports.USER_ROLE = {
    super_admin: 'super_admin',
    admin: 'admin',
    manager: 'manager',
    volunteer: 'volunteer',
    donor: 'donor',
    guest: 'guest',
};
exports.Role = [
    'super_admin',
    'admin',
    'manager',
    'volunteer',
    'donor',
    'guest',
];
exports.userSearchableFields = [
    'name.firstName',
    'name.lastName',
    'phoneNumber',
    'email',
    'address',
];
exports.UserStatus = ['in-progress', 'blocked'];
exports.userFilterableFields = ['searchTerm', 'phoneNumber', 'email'];
