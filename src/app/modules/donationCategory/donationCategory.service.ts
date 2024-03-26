import { SortOrder } from 'mongoose';
import {
  IDonationCategory,
  IDonationCategoryFilters,
} from './donationCategory.interface';
import { DonationCategory } from './donationCategory.model';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { DonationCategorySearchableFields } from './donationCategory.constant';

const createDonationCategory = async (
  payload: IDonationCategory
): Promise<IDonationCategory | null> => {
  const result = await DonationCategory.create(payload);
  return result;
};

const getAllDonationCategory = async (
  filter: IDonationCategoryFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IDonationCategory[]> | null> => {
  //

  const { searchTerm, ...filterData } = filter;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: DonationCategorySearchableFields.map(field => ({
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
  const result = await DonationCategory.find(whareConditions)
    .skip(skip)
    .limit(limit)
    .sort(sortConditions);

  const total = await DonationCategory.countDocuments(whareConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDonationCategory = async (
  id: string
): Promise<IDonationCategory | null> => {
  const result = await DonationCategory.findById({ _id: id });
  return result;
};

const updateDonationCategory = async (
  id: string,
  paylaoad: Partial<IDonationCategory>
): Promise<IDonationCategory | null> => {
  //
  const result = await DonationCategory.findByIdAndUpdate(
    { _id: id },
    paylaoad,
    { new: true }
  );
  return result;
};

const deleteDonationCategory = async (
  id: string
): Promise<IDonationCategory | null> => {
  const result = await DonationCategory.findByIdAndDelete({ _id: id });
  return result;
};
export const DonationCategoryService = {
  createDonationCategory,
  getAllDonationCategory,
  getSingleDonationCategory,
  updateDonationCategory,
  deleteDonationCategory,
};
