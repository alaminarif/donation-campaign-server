import { TBloodGroup, TGender } from './donor.interface';

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

export const donorSearchableFields = [
  'name.firstName',
  'name.lastName',
  'phoneNumber',
  'email',
  'address',
];

export const donorFilterableFields = ['searchTerm', 'phoneNumber', 'email'];
