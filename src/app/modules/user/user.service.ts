/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { TUser, TUserFilters } from './user.interface';
import { User } from './user.model';
import { userSearchableFields } from './user.constant';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { TManager } from '../manager/manager.interface';
import { Manager } from '../manager/manager.model';
import { TVolunteer } from '../volunteer/volunteer.interface';
import { Volunteer } from '../volunteer/volunteer.model';

const createAdminIntoDB = async (password: string, adminData: TAdmin) => {
  //
  const userData: Partial<TUser> = {};

  userData.role = 'admin';
  userData.password = password;
  userData.email = adminData.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    adminData.email = newUser[0].email;
    adminData.user = newUser[0]._id;

    const newAdmin = await Admin.create([adminData], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createManagerIntoDB = async (password: string, managerData: TManager) => {
  const userData: Partial<TUser> = {};

  userData.role = 'manager';
  userData.password = password;
  userData.email = managerData.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    managerData.email = newUser[0].email;
    managerData.user = newUser[0]._id;

    const newManager = await Manager.create([managerData], { session });

    if (!newManager.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newManager;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const createVolunteerIntoDB = async (
  password: string,
  volunteerData: TVolunteer
) => {
  const userData: Partial<TUser> = {};
  userData.password = password;
  userData.email = volunteerData.email;
  userData.role = 'volunteer';

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    volunteerData.email = newUser[0].email;
    volunteerData.user = newUser[0]._id;

    const newVolunteer = await Volunteer.create([volunteerData], { session });
    if (!newVolunteer.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newVolunteer;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getAllUser = async (
  filter: TUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<TUser[]> | null> => {
  //

  const { searchTerm, ...filterData } = filter;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
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
  const result = await User.find(whareConditions)
    .skip(skip)
    .limit(limit)
    .sort(sortConditions);

  const total = await User.countDocuments(whareConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getMe = async (userEmail: string, role: string) => {
  let result = null;

  if (role === 'admin') {
    result = await Admin.findOne({ email: userEmail }).populate('user');
  }
  console.log(result);
  return result;
};

export const UserService = {
  createAdminIntoDB,
  createManagerIntoDB,
  createVolunteerIntoDB,
  getAllUser,
  getMe,
};
