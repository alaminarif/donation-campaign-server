/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
export type Role = 'admin';

export type TUserName = {
  firstName: string;
  lastName: string;
};
export type TGender = 'male' | 'female' | 'other';

export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export type TManager = {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  name: TUserName;
  email: string;
  contactNo: string;
  gender: TGender;
  address: string;
  dateOfBirth?: Date;
  bloodGroup: TBloodGroup;
  profileImg?: string;
  isDeleted: boolean;
};

export type ManagerModel = {
  isUserExists(email: string): Promise<TManager | null>;
} & Model<TManager>;

export type TManagerFilters = {
  searchTerm?: string;
};
