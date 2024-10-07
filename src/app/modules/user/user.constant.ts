export const role = [
  'super_admin',
  'admin',
  'manager',
  'volunteer',
  'donor',
  'guest',
] as const;

export const USER_ROLE = {
  super_admin: 'super_admin',
  admin: 'admin',
  manager: 'manager',
  volunteer: 'volunteer',
  guest: 'guest',
} as const;

export const userSearchableFields = [
  'name.firstName',
  'name.lastName',
  'phoneNumber',
  'email',
  'address',
];

export const UserStatus = ['in-progress', 'blocked'];

export const userFilterableFields = ['searchTerm', 'phoneNumber', 'email'];
