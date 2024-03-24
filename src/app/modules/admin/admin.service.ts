/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  ILogin,
  ILoginResponse,
  IRefreshTokenResponse,
  IchangePassword,
} from '../auth/auth.interface';
import { IAdmin, IAdminFilters } from './admin.interface';
import { Admin } from './admin.model';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { adminSearchableFields } from './admin.constant';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';

// auth part start
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

  const { email: adminEmail, role, _id } = isAdminExist;

  const accessToken = jwtHelpers.createToken(
    { _id, adminEmail, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { _id, adminEmail, role },
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

  // checking deleted Admin's refresh token

  const isAdminExist = await Admin.isAdminExist(adminEmail);

  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not exist');
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      email: isAdminExist?.email,
      role: isAdminExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  Admin: JwtPayload | null,
  payload: IchangePassword
): Promise<void> => {
  const { oldPassword } = payload;

  const isAdminExist = await Admin?.findOne({
    email: Admin?.adminEmail,
  }).select('+password');
  // console.log('isAdminExist', isAdminExist);

  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'admin does not exist');
  }

  if (
    isAdminExist.password &&
    !(await Admin?.isPasswordMatched(oldPassword, isAdminExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'old password is incorrect');
  }
  // await Admin.updateOne();
  isAdminExist.save();
};
// auth part end

const getAllAdmin = async (
  filter: IAdminFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAdmin[]> | null> => {
  //

  const { searchTerm, ...filterData } = filter;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: adminSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whareConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Admin.find(whareConditions)
    .skip(skip)
    .limit(limit)
    .sort(sortConditions);

  const total = await Admin.countDocuments(whareConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getMyProfile = async (email: string): Promise<IAdmin | null> => {
  const result = await Admin.findOne({ email: email });
  return result;
};

const updateProfile = async (
  email: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  //

  // const isExist = await Admin.findOne({ email: email });
  // if (!isExist) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'Admin Not found');
  // }

  const { name, ...AdminData } = payload;
  const updatedAdminData: Partial<IAdmin> = { ...AdminData };
  // const updatedAdminData: Partial<IAdmin> = AdminData;

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IAdmin>;
      (updatedAdminData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const result = await Admin.findOneAndUpdate(
    { email: email },
    updatedAdminData,
    {
      new: true,
    }
  );
  return result;
};

const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findByIdAndDelete({ _id: id });
  return result;
};
export const AdminService = {
  createAdmin,
  loginAdmin,
  refreshToken,
  changePassword,
  getAllAdmin,
  getMyProfile,
  updateProfile,
  deleteAdmin,
};
