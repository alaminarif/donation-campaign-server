/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
export type Role = 'admin';

type name = {
  firstName: string;
  lastName: string;
};
export type IAdmin = {
  _id?: Types.ObjectId;
  name: name;
  email: string;
  password: string;
  passwordchangedAt?: Date;
  role: Role;
  phoneNumber: string;
  address: string;
};

// auth part

export type AdminModel = {
  isAdminExist(
    email: string
  ): Promise<Pick<IAdmin, '_id' | 'email' | 'password' | 'role'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;

//

export type IAdminFilters = {
  searchTerm?: string;
};
// export type AdminModel = Model<IAdmin, Record<string, unknown>>;
