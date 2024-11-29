/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TManager } from './manager.interface';

import mongoose from 'mongoose';
import { User } from '../user/user.model';
import { Manager } from './manager.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { managerSearchableFields } from './manager.constant';

const getAllmanager = async (query: Record<string, unknown>) => {
  //
  const managerQuery = new QueryBuilder(Manager.find(), query)
    .search(managerSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await managerQuery.modelQuery;
  const meta = await managerQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleManagerFromDB = async (id: string) => {
  const result = await Manager.findById(id);
  return result;
};

const updateManagerIntroDB = async (
  email: string,
  payload: Partial<TManager>
): Promise<TManager | null> => {
  //

  const user = await User.isUserExistByEmail(email);
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Manager Not found');
  }

  const { name, ...remainingManagerData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingManagerData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  const result = await Manager.findOneAndUpdate(
    { email: email },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

const deleteManagerFromDB = async (email: string) => {
  const user = await User.isUserExistByEmail(email);
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Manager Not found');
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedmanager = await Manager.findOneAndUpdate(
      { email },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedmanager) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to delete manager');
    }

    const deletedUser = await User.findOneAndUpdate(
      { email },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to delete User');
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
  getSingleManagerFromDB,
  updateManagerIntroDB,
  deleteManagerFromDB,
};
