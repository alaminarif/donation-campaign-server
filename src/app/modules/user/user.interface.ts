/* eslint-disable no-unused-vars */
import { Model, Schema, Types } from 'mongoose';
import { TAdmin } from '../admin/admin.interface';
export type Role = 'admin' | 'user';

type name = {
  firstName: string;
  lastName: string;
};
export type IUser = {
  // _id?: Types.ObjectId;
  email: string;
  password: string;
  passwordchangedAt?: Date;
  role: Role;
  isDeleted: boolean;
  // admin?: Types.ObjectId | TAdmin;
};

// export type UserModel = {
//   isUserExist(
//     email: string
//   ): Promise<Pick<IUser, '_id' | 'email' | 'password' | 'role'>>;
//   isPasswordMatched(
//     givenPassword: string,
//     savedPassword: string
//   ): Promise<boolean>;
// } & Model<IUser>;

// export type IUserFilters = {
//   searchTerm?: string;
// };
export type UserModel = Model<IUser, Record<string, unknown>>;
