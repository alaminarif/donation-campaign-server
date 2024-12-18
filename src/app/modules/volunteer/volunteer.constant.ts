import { TBloodGroup, TGender } from './volunteer.interface';

export const Gender: TGender[] = ['male', 'female', 'other'];

export const Days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

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

export const VolunteerSearchableFields = [
  'email',
  'id',
  'contactNo',
  'name.firstName',
  'name.lastName',
  'name.middleName',
];
