import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import QueryBuilder from '../../builder/QueryBuilder';
import { VolunteerSearchableFields } from './volunteer.constant';
import { TVolunteer } from './volunteer.interface';
import { Volunteer } from './volunteer.model';
import mongoose from 'mongoose';
import { User } from '../user/user.model';

const getAllvolunteersFromDB = async (query: Record<string, unknown>) => {
  const volunteerQuery = new QueryBuilder(Volunteer.find(), query)
    .search(VolunteerSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await volunteerQuery.modelQuery;
  const meta = await volunteerQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleVolunteerFromDB = async (volunteerId: string) => {
  const result = await Volunteer.findOne({ _id: volunteerId });
  return result;
};

const updateVolunteerIntoDB = async (
  email: string,
  payload: Partial<TVolunteer>
) => {
  const isExist = await Volunteer.findOne({ email: email });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Volunteer Not found');
  }

  const { name, ...remaimingVolunteerData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remaimingVolunteerData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Volunteer.findOneAndUpdate(
    { email: email },
    modifiedUpdatedData,
    { runValidators: true }
  );

  return result;
};

const deleteVolunteerFromDB = async (email: string) => {
  const isExist = await Volunteer.findOne({ email: email });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin Not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedVolunteer = await Volunteer.findOneAndUpdate(
      { email },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedVolunteer) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to delete Volunteer');
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
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const VolunteerService = {
  getAllvolunteersFromDB,
  getSingleVolunteerFromDB,
  updateVolunteerIntoDB,
  deleteVolunteerFromDB,
};
