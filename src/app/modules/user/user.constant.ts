export const role = ['super_admin', 'admin', 'donor'] as const;
export const USER_ROLE = {
  superAdmin: 'superAdmin',
  student: 'student',
  faculty: 'faculty',
  admin: 'admin',
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
