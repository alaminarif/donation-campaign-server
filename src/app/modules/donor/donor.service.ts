import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import mongoose from 'mongoose';
import { Donor } from './donor.model';
import { User } from '../user/user.model';
import { TDonor } from './donor.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { donorSearchableFields } from './donor.constant';

const getAllDonor = async (query: Record<string, unknown>) => {
  //
  const DonorQuery = new QueryBuilder(Donor.find(), query)
    .search(donorSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await DonorQuery.modelQuery;
  const meta = await DonorQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleDonorFromDB = async (id: string) => {
  //
  const user = await User.isUserExistById(id);
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Donor Not found');
  }

  const result = await Donor.findById(id);

  return result;
};

const updateDonorIntroDB = async (
  id: string,
  payload: Partial<TDonor>
): Promise<TDonor | null> => {
  //
  const user = await Donor.isDonorExistsById(id);
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Donor Not found');
  }

  const { name, ...remainingDonorData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingDonorData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  const result = await Donor.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteDonorFromDB = async (id: string) => {
  const user = await Donor.isDonorExistsById(id);
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Donor Not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedDonor = await Donor.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedDonor) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to delete Donor');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to delete User');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedDonor;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const DonorService = {
  getAllDonor,
  getSingleDonorFromDB,
  updateDonorIntroDB,
  deleteDonorFromDB,
};
