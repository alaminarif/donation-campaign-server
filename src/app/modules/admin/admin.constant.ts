export const role = ['user', 'admin'] as const;

export const adminSearchableFields = [
  'name.firstName',
  'name.lastName',
  'phoneNumber',
  'email',
  'address',
];

export const adminFilterableFields = ['searchTerm', 'phoneNumber', 'email'];
