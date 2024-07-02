/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
// import {
//   TLogin,
//   TLoginResponse,
//   IRefreshTokenResponse,
//   IchangePassword,
// } from '../auth/auth.interface';
import { TAdmin, TAdminFilters } from './admin.interface';
import { Admin } from './admin.model';
// import { jwtHelpers } from '../../../helpers/jwtHelpers';
// import { JwtPayload, Secret } from 'jsonwebtoken';
// import config from '../../../config';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { adminSearchableFields } from './admin.constant';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import mongoose, { SortOrder } from 'mongoose';
import { User } from '../user/user.model';

// auth part start

// const loginAdmin = async (payload: TLogin): Promise<TLoginResponse> => {
//   const { email } = payload;

//   const isAdminExist = await Admin.isAdminExist(email);

//   if (!isAdminExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'admin does not exist');
//   }

//   const { email: adminEmail, role, _id } = isAdminExist;

//   const accessToken = jwtHelpers.createToken(
//     { _id, adminEmail, role },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string
//   );
//   const refreshToken = jwtHelpers.createToken(
//     { _id, adminEmail, role },
//     config.jwt.refresh_secret as Secret,
//     config.jwt.refresh_expires_in as string
//   );

//   return { accessToken, refreshToken };
// };

// const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
//   //verify token
//   // invalid token - synchronous
//   let verifiedToken = null;
//   try {
//     verifiedToken = jwtHelpers.verifyToken(
//       token,
//       config.jwt.refresh_secret as Secret
//     );
//   } catch (err) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
//   }

//   const { adminEmail } = verifiedToken;

//   // checking deleted Admin's refresh token

//   const isAdminExist = await Admin.isAdminExist(adminEmail);

//   if (!isAdminExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not exist');
//   }
//   //generate new token

//   const newAccessToken = jwtHelpers.createToken(
//     {
//       email: isAdminExist?.email,
//       role: isAdminExist.role,
//     },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string
//   );

//   return {
//     accessToken: newAccessToken,
//   };
// };

// const changePassword = async (
//   Admin: JwtPayload | null,
//   payload: IchangePassword
// ): Promise<void> => {
//   const { oldPassword } = payload;

//   const isAdminExist = await Admin?.findOne({
//     email: Admin?.adminEmail,
//   }).select('+password');
//   // console.log('isAdminExist', isAdminExist);

//   if (!isAdminExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'admin does not exist');
//   }

//   if (
//     isAdminExist.password &&
//     !(await Admin?.isPasswordMatched(oldPassword, isAdminExist.password))
//   ) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'old password is incorrect');
//   }
//   // await Admin.updateOne();
//   isAdminExist.save();
// };
// auth part end

const getAllAdmin = async (
  filter: TAdminFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<TAdmin[]> | null> => {
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

const getMyProfile = async (email: string): Promise<TAdmin | null> => {
  const result = await Admin.findOne({ email: email });
  return result;
};

const updateProfile = async (
  email: string,
  payload: Partial<TAdmin>
): Promise<TAdmin | null> => {
  //

  // const isExist = await Admin.findOne({ email: email });
  // if (!isExist) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'Admin Not found');
  // }

  const { name, ...AdminData } = payload;
  const updatedAdminData: Partial<TAdmin> = { ...AdminData };
  // const updatedAdminData: Partial<TAdmin> = AdminData;

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<TAdmin>;
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

const deleteAdminFromDB = async (email: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedAdmin = await Admin.findOneAndUpdate(
      { email },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedAdmin) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to delete Admin');
    }

    const deletedUser = await User.findOneAndUpdate(
      { email },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to delete User');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedAdmin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const AdminService = {
  // loginAdmin,
  // refreshToken,
  // changePassword,
  getAllAdmin,
  getMyProfile,
  updateProfile,
  deleteAdminFromDB,
};
