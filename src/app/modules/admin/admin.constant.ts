export const role = ['user', 'admin'] as const;

export const userSeachableFields = [
  'name.firstName',
  'name.lastName',
  'phoneNumber',
  'email',
  'address',
];

export const userFilterableFields = ['searchTerm', 'phoneNumber', 'email'];
