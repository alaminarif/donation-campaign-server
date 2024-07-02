/* eslint-disable no-unused-vars */
import { Model, Schema, Types } from 'mongoose';
import { TAdmin } from '../admin/admin.interface';
export type Role = 'admin' | 'user';

export type TUser = {
  _id?: Types.ObjectId;
  email: string;
  password: string;
  passwordchangedAt?: Date;
  role: Role;
  isDeleted: boolean;
  // admin?: Types.ObjectId | TAdmin;
};

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<TUser, '_id' | 'email' | 'password' | 'role'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<TUser>;

export type TUserFilters = {
  searchTerm?: string;
};
// export type UserModel = Model<TUser, Record<string, unknown>>;
