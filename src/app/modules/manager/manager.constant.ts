import { TBloodGroup, TGender } from './manager.interface';

export const Gender: TGender[] = ['male', 'female', 'other'];

export const BloodGroup: TBloodGroup[] = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
];

export const managerSearchableFields = [
  'name.firstName',
  'name.lastName',
  'phoneNumber',
  'email',
  'address',
];

export const managerFilterableFields = ['searchTerm', 'phoneNumber', 'email'];
