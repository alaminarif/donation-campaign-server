import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  ILogin,
  ILoginResponse,
  IRefreshTokenResponse,
} from '../auth/auth.interface';
import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';

const createAdmin = async (payload: IAdmin): Promise<IAdmin | null> => {
  payload.role = 'admin';
  const result = await Admin.create(payload);
  return result;
};

const loginAdmin = async (payload: ILogin): Promise<ILoginResponse> => {
  const { email } = payload;

  const isAdminExist = await Admin.isAdminExist(email);

  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'admin does not exist');
  }

  const { email: adminEmail, role } = isAdminExist;
  console.log('email : ', adminEmail);

  const accessToken = jwtHelpers.createToken(
    { adminEmail, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { adminEmail, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return { accessToken, refreshToken };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { adminEmail } = verifiedToken;

  // checking deleted user's refresh token

  const isUserExist = await Admin.isAdminExist(adminEmail);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      email: isUserExist?.email,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AdminService = {
  createAdmin,
  loginAdmin,
  refreshToken,
};
