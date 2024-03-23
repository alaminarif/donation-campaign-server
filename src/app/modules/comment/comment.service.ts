import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { commentSearchableFields } from './comment.constant';
import { IComment, ICommentFilters } from './comment.interface';
import { Comment } from './comment.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createComment = async (payload: IComment): Promise<IComment | null> => {
  const result = (await Comment.create(payload)).populate('user');
  return result;
};
const getAllComment = async (
  filter: ICommentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IComment[]> | null> => {
  //

  const { searchTerm, ...filterData } = filter;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: commentSearchableFields.map(field => ({
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
  const result = await Comment.find(whareConditions)
    .populate('user')
    .skip(skip)
    .limit(limit)
    .sort(sortConditions);

  const total = await Comment.countDocuments(whareConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getMyComment = async (email: string) => {
  //
  // const isExist = await Comment.findOne({ email: email });
  // console.log('isExist : ', isExist);

  // if (!isExist) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'user Not found');
  // }

  const query = { 'user.email': email };
  console.log('query', query);

  const result = await Comment.findOne(query);
  console.log('result : ', result);
  return result;
};

const updateComment = async (
  email: string,
  payload: Partial<IComment>
): Promise<IComment | null> => {
  //

  const isExist = await Comment.findOne({ email });
  console.log('isExist : ', isExist);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment Not found');
  }

  const result = await Comment.findOneAndUpdate(
    { 'user.email': email },
    payload,
    {
      new: true,
    }
  ).populate('user');
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
