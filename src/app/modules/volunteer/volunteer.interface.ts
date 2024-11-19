/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
export type Role = 'volunteer';

export type TUserName = {
  firstName: string;
  lastName: string;
};
export type TGender = 'male' | 'female' | 'other';

// export type TSkill =
//   | 'Event Planning'
//   | 'Public Speaking'
//   | 'IT Support'
//   | 'Graphic Design'
//   | 'Fundraising'
//   | 'Marketing';

export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export type TDays = 'Sat' | 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';

export type TVolunteer = {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  email: string;
  name: TUserName;
  gender: TGender;
  dateOfBirth?: Date;
  contactNo: string;
  address: string;
  bloodGroup: TBloodGroup;
  skill: string;
  abailability: TDays;
  preferredCampaigns: string;
  startDate: Date;
  endDate: Date;
  hoursLogged?: string;
  profileImg?: string;
  isDeleted: boolean;
};

export type VolunteerModel = {
  isUserExists(email: string): Promise<TVolunteer | null>;
} & Model<TVolunteer>;

export type TVolunteerFilters = {
  searchTerm?: string;
};
