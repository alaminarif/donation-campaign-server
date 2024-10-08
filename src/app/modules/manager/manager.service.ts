/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { TManager, TManagerFilters } from './manager.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { managerSearchableFields } from './manager.constant';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import mongoose, { SortOrder } from 'mongoose';
import { User } from '../user/user.model';
import { Manager } from './manager.model';

const getAllmanager = async (
  filter: TManagerFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<TManager[]> | null> => {
  //

  const { searchTerm, ...filterData } = filter;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: managerSearchableFields.map(field => ({
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
  const result = await Manager.find(whareConditions)
    .skip(skip)
    .limit(limit)
    .sort(sortConditions);

  const total = await Manager.countDocuments(whareConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getMe = async (email: string): Promise<TManager | null> => {
  const result = await Manager.findOne({ email: email });
  return result;
};

const updateProfile = async (
  email: string,
  payload: Partial<TManager>
): Promise<TManager | null> => {
  //

  // const isExist = await manager.findOne({ email: email });
  // if (!isExist) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'manager Not found');
  // }

  const { name, ...managerData } = payload;
  const updatedmanagerData: Partial<TManager> = { ...managerData };
  // const updatedmanagerData: Partial<TManager> = managerData;

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<TManager>;
      (updatedmanagerData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const result = await Manager.findOneAndUpdate(
    { email: email },
    updatedmanagerData,
    {
      new: true,
    }
  );
  return result;
};

const deleteManagerFromDB = async (email: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedmanager = await Manager.findOneAndUpdate(
      { email },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedmanager) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to delete manager');
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

    return deletedmanager;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const ManagerService = {
  getAllmanager,
  getMe,
  updateProfile,
  deleteManagerFromDB,
};
