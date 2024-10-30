import { SortOrder } from 'mongoose';

import { paginationHelpers } from '../../helpers/paginationHelper';
import { IPaginationOptions } from '../../interfaces/pagination';
import { IGenericResponse } from '../../interfaces/common';
import { IBlog, IBlogFilters } from './blog.interface';
import { Blog } from './blog.model';
import { blogSearchableFields } from './blog.constant';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createBlog = async (payload: IBlog): Promise<IBlog | null> => {
  const result = (await Blog.create(payload)).populate('comment');
  return result;
};

const getAllBlog = async (
  filter: IBlogFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBlog[]> | null> => {
  //

  const { searchTerm, ...filterData } = filter;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: blogSearchableFields.map(field => ({
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

  const result = await Blog.find(whareConditions)
    .populate('comment')
    .skip(skip)
    .limit(limit)
    .sort(sortConditions);

  const total = await Blog.countDocuments(whareConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBlog = async (id: string): Promise<IBlog | null> => {
  //
  const query = { id: id };

  const isExist = await Blog.findOne(query);

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'user Not found');
  }

  const result = await Blog.findOne(query).populate('comment');

  return result;
};

const getMyBlog = async (id: string): Promise<IBlog | null> => {
  //
  const query = { user: id };

  const isExist = await Blog.findOne(query);

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'user Not found');
  }

  const result = await Blog.findOne(query).populate('user');

  return result;
};

const updateBlog = async (
  id: string,
  payload: Partial<IBlog>
): Promise<IBlog | null> => {
  //
  const query = { _id: id };
  const isExist = await Blog.findOne(query);

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog Not found');
  }

  const result = await Blog.findOneAndUpdate(query, payload, {
    new: true,
  }).populate('comment');
  return result;
};

const deleteBlog = async (id: string): Promise<IBlog | null> => {
  const result = await Blog.findByIdAndDelete({ _id: id }).populate('comment');
  return result;
};

export const BlogService = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  getMyBlog,
  updateBlog,
  deleteBlog,
};
