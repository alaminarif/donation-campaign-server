import { TRole } from './user.interface';

export const USER_ROLE = {
  super_admin: 'super_admin',
  admin: 'admin',
  manager: 'manager',
  volunteer: 'volunteer',
  donor: 'donor',
  guest: 'guest',
} as const;

export const Role: TRole[] = [
  'super_admin',
  'admin',
  'manager',
  'volunteer',
  'donor',
  'guest',
];

export const userSearchableFields = [
  'name.firstName',
  'name.lastName',
  'phoneNumber',
  'email',
  'address',
];

export const UserStatus = ['in-progress', 'blocked'];

export const userFilterableFields = ['searchTerm', 'phoneNumber', 'email'];
