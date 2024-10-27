import { SortOrder } from 'mongoose';

import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { DonationSearchableFields } from './donation.constant';
import { TDonation, TDonationFilters } from './donation.interface';
import { Donation } from './donation.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createDonation = async (
  payload: TDonation
): Promise<TDonation | null> => {
  const result = await Donation.create(payload);
  return result;
};

const getAllDonation = async (
  filter: TDonationFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<TDonation[]> | null> => {
  //

  const { searchTerm, ...filterData } = filter;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: DonationSearchableFields.map(field => ({
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
  const result = await Donation.find(whareConditions)
    .populate('user')
    .skip(skip)
    .limit(limit)
    .sort(sortConditions);

  const total = await Donation.countDocuments(whareConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDonation = async (id: string): Promise<TDonation | null> => {
  const result = await Donation.findById({ _id: id }).populate('user');
  return result;
};

const updateDonation = async (
  id: string,
  paylaoad: Partial<TDonation>
): Promise<TDonation | null> => {
  //
  const query = { user: id };
  const isExist = await Donation.findOne(query);
  // console.log('isExist : ', isExist);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user Not found');
  }
  const result = await Donation.findByIdAndUpdate(query, paylaoad, {
    new: true,
  }).populate('user');

  return result;
};

const deleteDonation = async (id: string): Promise<TDonation | null> => {
  const result = await Donation.findByIdAndDelete({ _id: id }).populate('user');
  return result;
};
export const DonationService = {
  createDonation,
  getAllDonation,
  getSingleDonation,
  updateDonation,
  deleteDonation,
};
