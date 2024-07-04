/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { TAdmin, TAdminFilters } from './admin.interface';
import { Admin } from './admin.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { adminSearchableFields } from './admin.constant';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import mongoose, { SortOrder } from 'mongoose';
import { User } from '../user/user.model';

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

const getMe = async (email: string): Promise<TAdmin | null> => {
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

  getAllAdmin,
  getMe,
  updateProfile,
  deleteAdminFromDB,
};
