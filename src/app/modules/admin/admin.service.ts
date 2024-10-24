/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';
import mongoose from 'mongoose';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { AdminSearchableFields } from './admin.constant';

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  const meta = await adminQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleAdminFromDB = async (
  adminId: string
): Promise<TAdmin | null> => {
  const result = await Admin.findOne({ email: adminId });
  return result;
};

const updateAdminIntroDB = async (
  email: string,
  payload: Partial<TAdmin>
): Promise<TAdmin | null> => {
  //

  const isExist = await Admin.findOne({ email: email });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin Not found');
  }

  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  const result = await Admin.findOneAndUpdate(
    { email: email },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

const deleteAdminFromDB = async (email: string) => {
  //
  const isExist = await Admin.findOne({ email: email });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin Not found');
  }

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
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminIntroDB,
  deleteAdminFromDB,
};
