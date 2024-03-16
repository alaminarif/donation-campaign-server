export const role = ['user', 'admin'] as const;

export const userSeachableFields = [
  'name.firstName',
  'name.lastName',
  'phoneNumber',
  'email',
];

export const userFilterableFields = ['searchTerm', 'phoneNumber', 'email'];
