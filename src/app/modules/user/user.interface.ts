/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
export type Role = 'admin' | 'user';

type name = {
  firstName: string;
  lastName: string;
};
export type IUser = {
  // _id?: Types.ObjectId;
  name: name;
  email: string;
  password: string;
  passwordchangedAt?: Date;
  role: Role;
  phoneNumber: string;
  address: string;
};

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, 'email' | 'password' | 'role'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

export type IUserFilters = {
  searchTerm?: string;
};
// export type UserModel = Model<IUser, Record<string, unknown>>;
