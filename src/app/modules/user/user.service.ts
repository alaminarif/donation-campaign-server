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

const createAdmin = async (password: string, adminData: TAdmin) => {
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
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

const createManager = async (password: string, managerData: TManager) => {};

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

// const updateProfile = async (
//   email: string,
//   payload: Partial<TUser>
// ): Promise<TUser | null> => {
//   //

//   // const isExist = await User.findOne({ email: email });
//   // if (!isExist) {
//   //   throw new ApiError(httpStatus.NOT_FOUND, 'User Not found');
//   // }

//   const { name, ...userData } = payload;
//   const updatedUserData: Partial<TUser> = { ...userData };
//   // const updatedUserData: Partial<TUser> = userData;

//   if (name && Object.keys(name).length > 0) {
//     Object.keys(name).forEach(key => {
//       const nameKey = `name.${key}` as keyof Partial<TUser>;
//       (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
//     });
//   }
//   const result = await User.findOneAndUpdate(
//     { email: email },
//     updatedUserData,
//     {
//       new: true,
//     }
//   );
//   return result;
// };

const deleteUser = async (id: string): Promise<TUser | null> => {
  const result = await User.findByIdAndDelete({ _id: id });
  return result;
};

export const UserService = {
  createAdmin,
  getAllUser,
  getMe,
  // updateProfile,
  deleteUser,
};

// const andConditions = [
//   {
//     $or: [
//       {
//         phoneNumber: {
//           $regex: searchTerm,
//           $options: 'i',
//         },
//       },
//     ],
//   },
// ];
