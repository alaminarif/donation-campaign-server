import { SortOrder } from 'mongoose';

import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { IRating } from './rating.interface';
import { Rating } from './rating.model';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

const createRating = async (payload: IRating): Promise<IRating | null> => {
  const result = await Rating.create(payload);
  return result;
};

const getAllRating = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IRating[]> | null> => {
  //

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Rating.find({})
    .populate('user')
    .skip(skip)
    .limit(limit)
    .sort(sortConditions);

  const total = await Rating.countDocuments();
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
  const query = { user: id };
  const isExist = await Rating.findOne(query);
  // console.log('isExist : ', isExist);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment Not found');
  }
  const result = await Rating.findByIdAndUpdate(query, paylaoad, {
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
