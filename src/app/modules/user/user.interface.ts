/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
export type Role = 'admin' | 'user';

type name = {
  firstName: string;
  lastName: string;
};
export type IUser = {
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

// export type UserModel = Model<IUser, Record<string, unknown>>;
