import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import ApiError from '../../../errors/ApiError';
// import { TUser } from '../user/user.interface';
import { User } from './../user/user.model';
import {
  TLogin,
  TLoginResponse,
  IRefreshTokenResponse,
  IchangePassword,
} from './auth.interface';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { JwtPayload, Secret } from 'jsonwebtoken';
import { sendEmail } from '../../../utils/sendEmail';
import { createToken } from './auth.utils';

const loginUser = async (payload: TLogin): Promise<TLoginResponse> => {
  const { email } = payload;

  const user = await User.isUserExistByEmail(email);

  // const isUserExist = await User.findOne({ email });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new ApiError(httpStatus.FORBIDDEN, 'this user is Deleted');
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new ApiError(httpStatus.FORBIDDEN, 'Password do not matched');

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
  // invalid token - synchronous
  let verifiedToken = null;

  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt_refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userEmail } = verifiedToken;

  // checking deleted user's refresh token

  const isUserExist = await User.isUserExistByEmail(userEmail);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      email: isUserExist.email,
      role: isUserExist.role,
    },
    config.jwt_access_secret as Secret,
    config.jwt_access_expires_in as string
  );
  console.log('newAccessToken: ', newAccessToken);

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IchangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  const isUserExist = await User.isUserExistByEmail(user?.userEmail);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'old password is incorrect');
  }

  const newHashPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  const query = { email: user?.userEmail };

  const updatedData = {
    password: newHashPassword,
    passwordchangedAt: new Date(),
  };

  await User.updateOne(query, updatedData);
};

const forgetPassword = async (userEmail: string) => {
  const user = await User.isUserExistByEmail(userEmail);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'this user is not found !');
  }

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new ApiError(httpStatus.FORBIDDEN, 'this user is deleted');
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
    throw new ApiError(httpStatus.NOT_FOUND, 'this user is not found !');
  }

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new ApiError(httpStatus.FORBIDDEN, 'this user is deleted');
  }

  const decode = jwtHelpers.verifyToken(
    token,
    config.jwt_access_secret as Secret
  );

  if (payload.email !== decode.email) {
    throw new ApiError(httpStatus.FORBIDDEN, 'you are forbidden');
  }

  const newHashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  await User.findOneAndUpdate(
    {
      email: decode.email,
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
