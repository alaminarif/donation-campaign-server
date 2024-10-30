/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TRole =
  | 'super_admin'
  | 'admin'
  | 'manager'
  | 'volunteer'
  | 'donor'
  | 'guest';

export interface TUser {
  email: string;
  password: string;
  passwordchangedAt?: Date;
  role: TRole;
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistByEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;

  isJWTIssuedBeforePasswordChanged(
    passwordChangeTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;

// export type TUserFilters = {
//   searchTerm?: string;
// };
// export type UserModel = Model<TUser, Record<string, unknown>>;
