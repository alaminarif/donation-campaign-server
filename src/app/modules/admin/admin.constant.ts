export const role = ['user', 'admin'] as const;

export const adminSeachableFields = [
  'name.firstName',
  'name.lastName',
  'phoneNumber',
  'email',
  'address',
];

export const adminFilterableFields = ['searchTerm', 'phoneNumber', 'email'];
