import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../user/user.interface';
import { User } from './../user/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const createUser = async (payload: IUser): Promise<IUser | null> => {
  payload.role = 'user';
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  // const {password}= isUserExist
  // const isPasswordMatched = await bcrypt.compare(
  //   password,
  //   isUserExist?.password
  // );

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }
  const { email: userEmail, role } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { userEmail, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { userEmail, role },
    config.jwt.secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return { accessToken, refreshToken };
};
// const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
//   let verifiedToken = null;
//   try {
//     verifiedToken = jwtHelpers.verifyToken(
//       token,
//       config.jwt.refresh_secret as Secret
//     );
//   } catch (err) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
//   }

//   const { email } = verifiedToken;

//   const isUserExist = await User.isUserExist(email);
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }
//   //generate new token

//   const newAccessToken = jwtHelpers.createToken(
//     {
//       email: isUserExist.email,
//       role: isUserExist.role,
//     },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string
//   );

//   return {
//     accessToken: newAccessToken,
//   };
// };

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
    console.log('userEmail', verifiedToken);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userEmail } = verifiedToken;

  console.log('userEmail', userEmail);

  // checking deleted user's refresh token

  const isUserExist = await User.isUserExist(userEmail);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      email: isUserExist.email,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  console.log('newAccessToken: ', newAccessToken);

  return {
    accessToken: newAccessToken,
  };
};
export const AuthService = {
  createUser,
  loginUser,
  refreshToken,
};
