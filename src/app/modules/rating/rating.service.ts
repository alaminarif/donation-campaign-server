import { SortOrder } from 'mongoose';

import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { IRating, IRatingFilters } from './rating.interface';
import { Rating } from './rating.model';
import { ratingSearchableFields } from './rating.constant';

const createRating = async (payload: IRating): Promise<IRating | null> => {
  const result = await Rating.create(payload);
  return result;
};

const getAllRating = async (
  filter: IRatingFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IRating[]> | null> => {
  //

  const { searchTerm, ...filterData } = filter;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: ratingSearchableFields.map(field => ({
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

  const result = await Rating.find(whareConditions)
    .populate('user')
    .skip(skip)
    .limit(limit)
    .sort(sortConditions);

  const total = await Rating.countDocuments(whareConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleRating = async (id: string): Promise<IRating | null> => {
  const result = await Rating.findById({ _id: id }).populate('user');
  return result;
};

const updateRating = async (
  id: string,
  paylaoad: Partial<IRating>
): Promise<IRating | null> => {
  const result = await Rating.findByIdAndUpdate({ _id: id }, paylaoad, {
    new: true,
  });
  return result;
};

const deleteRating = async (id: string): Promise<IRating | null> => {
  const result = await Rating.findByIdAndDelete({ _id: id });
  return result;
};
export const RatingService = {
  createRating,
  getAllRating,
  getSingleRating,
  updateRating,
  deleteRating,
};
