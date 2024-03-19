export const role = ['user', 'admin'] as const;

export const userSearchableFields = [
  'name.firstName',
  'name.lastName',
  'phoneNumber',
  'email',
  'address',
];

export const userFilterableFields = ['searchTerm', 'phoneNumber', 'email'];
