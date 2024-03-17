/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
export type Role = 'admin';

type name = {
  firstName: string;
  lastName: string;
};
export type IAdmin = {
  name: name;
  email: string;
  password: string;
  passwordchangedAt?: Date;
  role: Role;
  phoneNumber: string;
  address: string;
};

// auth part
export type ILoginAdmin = {
  email: string;
  password: string;
};

export type ILoginAdminResponse = {
  refreshToken?: string;
  accessToken: string;
};
export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IchangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type AdminModel = {
  isAdminExist(
    email: string
  ): Promise<Pick<IAdmin, 'email' | 'password' | 'role'>>;
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
