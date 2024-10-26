import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
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

const getSingleDonorFromDB = async (adminId: string) => {
  const result = await Donor.findOne({ email: adminId });
  return result;
};

const updateDonorIntroDB = async (
  email: string,
  payload: Partial<TDonor>
): Promise<TDonor | null> => {
  //

  // const isExist = await Admin.findOne({ email: email });
  // if (!isExist) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'Admin Not found');
  // }

  const { name, ...remainingDonorData } = payload;

  console.log('name:', payload);

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingDonorData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  const result = await Donor.findOneAndUpdate(
    { email: email },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

const deleteDonorFromDB = async (email: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedDonor = await Donor.findOneAndUpdate(
      { email },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedDonor) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to delete Donor');
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
