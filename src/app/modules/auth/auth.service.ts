import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { User } from './../user/user.model';
import {
  TLogin,
  TLoginResponse,
  IRefreshTokenResponse,
  TChangePassword,
} from './auth.interface';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';
import { sendEmail } from '../../utils/sendEmail';
import { createToken, verifyToken } from './auth.utils';
import AppError from '../../errors/AppError';

const loginUser = async (payload: TLogin): Promise<TLoginResponse> => {
  const { email } = payload;

  const user = await User.isUserExistByEmail(email);

  // const isUserExist = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'this user is Deleted');
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };

  // const { email: userEmail, role, _id } = user;

  // const accessToken = jwtHelpers.createToken(
  //   { userEmail, role, _id },
  //   config.jwt.secret as Secret,
  //   config.jwt.expires_in as string
  // );

  // const refreshToken = jwtHelpers.createToken(
  //   { userEmail, role, _id },
  //   config.jwt.refresh_secret as Secret,
  //   config.jwt.refresh_expires_in as string
  // );

  // return { accessToken, refreshToken };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token

  let verifiedToken = null;

  try {
    verifiedToken = verifyToken(token, config.jwt_refresh_secret as string);
  } catch (err) {
    throw new AppError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userEmail } = verifiedToken;

  // checking deleted user's refresh token
  const user = await User.isUserExistByEmail(userEmail);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //generate new token
  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};

const changePassword = async (
  userData: JwtPayload | null,
  payload: TChangePassword
) => {
  const { oldPassword, newPassword } = payload;

  const user = await User.isUserExistByEmail(userData?.userEmail);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'this user is not found !');
  }

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  if (!(await User.isPasswordMatched(oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  const newHashPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  const query = { email: userData?.userEmail, role: userData?.role };

  const updatedData = {
    password: newHashPassword,
    passwordchangedAt: new Date(),
  };

  await User.updateOne(query, updatedData);
};

const forgetPassword = async (userEmail: string) => {
  const user = await User.isUserExistByEmail(userEmail);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'this user is not found !');
  }

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'this user is deleted');
  }

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const resetLink = `${config.reset_pass_ui_link}?email=${user.email}&token=${resetToken}`;

  sendEmail(user.email, resetLink);

  console.log('resetLink', resetLink);
};

const resetPassword = async (
  payload: { email: string; newPassword: string },
  token: string
) => {
  const user = await User.isUserExistByEmail(payload?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'this user is not found !');
  }

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'this user is deleted');
  }

  const decode = verifyToken(token, config.jwt_access_secret as string);

  console.log('decode', decode);

  console.log(payload.email, decode.userEmail);

  if (payload.email !== decode.userEmail) {
    throw new AppError(httpStatus.FORBIDDEN, 'you are forbidden');
  }

  const newHashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  await User.findOneAndUpdate(
    {
      email: decode.userEmail,
      role: decode.role,
    },
    {
      password: newHashPassword,
      passwordchangedAt: new Date(),
    }
  );
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
