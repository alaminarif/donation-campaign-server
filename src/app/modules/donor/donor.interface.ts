/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
export type Role = 'donor';

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

export type TDonor = {
  id: string;
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

export type DonorModel = {
  isDonorExistsById(id: string): Promise<TDonor | null>;
} & Model<TDonor>;

export type TDonorFilters = {
  searchTerm?: string;
};
