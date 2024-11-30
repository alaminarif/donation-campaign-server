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

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  email: string;
  name: TUserName;
  contactNo: string;
  gender: TGender;
  address: string;
  dateOfBirth?: Date;
  bloodGroup: TBloodGroup;
  profileImg?: string;
  isDeleted: boolean;
};

export type AdminModel = {
  isAdminExistsById(id: string): Promise<TAdmin | null>;
} & Model<TAdmin>;

export type TAdminFilters = {
  searchTerm?: string;
};
