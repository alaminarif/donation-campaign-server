import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IUser, IUserFilters } from './user.interface';
import { User } from './user.model';
import { userSeachableFields } from './user.constant';

const getAllUser = async (
  filter: IUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]> | null> => {
  //

  const { searchTerm, ...filterData } = filter;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: userSeachableFields.map(field => ({
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

const getMyProfile = async (email: string): Promise<IUser | null> => {
  const result = await User.findOne({ email: email });
  return result;
};

export const UserService = { getAllUser, getMyProfile };

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
