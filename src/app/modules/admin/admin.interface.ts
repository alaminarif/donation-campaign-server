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
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  designation: string;
  name: TUserName;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender: TGender;
  presentAddress: string;
  permanentAddress: string;
  dateOfBirth?: Date;
  bloogGroup?: TBloodGroup;
  profileImg?: string;
  isDeleted: boolean;
};

// auth part

// export type AdminModel = {
//   isAdminExist(
//     email: string
//   ): Promise<Pick<TAdmin, '_id' | 'email' | 'password' | 'role'>>;
//   isPasswordMatched(
//     givenPassword: string,
//     savedPassword: string
//   ): Promise<boolean>;
// } & Model<TAdmin>;

// //

// export type TAdminFilters = {
//   searchTerm?: string;
// };
export type AdminModel = Model<TAdmin, Record<string, unknown>>;
