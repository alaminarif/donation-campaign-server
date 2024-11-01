import { TBloodGroup, TGender } from './admin.interface';

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

export const AdminSearchableFields = [
  'name.firstName',
  'name.lastName',
  'phoneNumber',
  'email',
  'address',
];

export const adminFilterableFields = ['searchTerm', 'phoneNumber', 'email'];
