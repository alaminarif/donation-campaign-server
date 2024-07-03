/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
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
  ): Promise<Pick<TUser, '_id' | 'email' | 'password' | 'role' | 'isDeleted'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;

  isJWTIssuedDeforedPasswordChanged(
    passwordChangeTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
} & Model<TUser>;

export type TUserFilters = {
  searchTerm?: string;
};
// export type UserModel = Model<TUser, Record<string, unknown>>;
