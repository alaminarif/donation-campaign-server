import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IComment } from './comment.interface';
import { Comment } from './comment.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createComment = async (payload: IComment): Promise<IComment | null> => {
  const result = (await Comment.create(payload)).populate('user');
  return result;
};

const getAllComment = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IComment[]> | null> => {
  //

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Comment.find({})
    .populate('user')
    .skip(skip)
    .limit(limit)
    .sort(sortConditions);

  const total = await Comment.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getMyComment = async (id: string): Promise<IComment | null> => {
  //
  const query = { user: id };

  const isExist = await Comment.findOne(query);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user Not found');
  }

  const result = await Comment.findOne(query).populate('user');

  return result;
};

const updateComment = async (
  id: string,
  payload: Partial<IComment>
): Promise<IComment | null> => {
  //
  const query = { user: id };
  const isExist = await Comment.findOne(query);
  // console.log('isExist : ', isExist);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment Not found');
  }

  const result = await Comment.findOneAndUpdate(query, payload, {
    new: true,
  }).populate('user');
  return result;
};

const deleteComment = async (id: string): Promise<IComment | null> => {
  const result = await Comment.findByIdAndDelete({ _id: id });
  return result;
};
export const CommentService = {
  createComment,
  getAllComment,
  getMyComment,
  updateComment,
  deleteComment,
};
