import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';

import sendResponse from '../../utils/sendResponse';

import httpStatus from 'http-status';

import { paginationFields } from '../../constants/pagination';
import pick from '../../utils/pick';
import { BlogService } from './blog.service';
import { IBlog } from './blog.interface';
import { blogFilterableFields } from './blog.constant';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;

  const result = await BlogService.createBlog(user);

  sendResponse<IBlog>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'donationa categories created successfully  ',
    data: result,
  });
});

const getAllBlog = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions

  const filters = pick(req.query, blogFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BlogService.getAllBlog(filters, paginationOptions);

  sendResponse<IBlog[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Donation Category retrive successfully  ',
    meta: result?.meta,
    data: result?.data,
  });
});

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  //
  const id = req.params._id;

  const result = await BlogService.getMyBlog(id);

  sendResponse<IBlog>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog rtive successfully  ',
    data: result,
  });
});

const getMyBlog = catchAsync(async (req: Request, res: Response) => {
  //
  const id = req.user?._id;

  const result = await BlogService.getMyBlog(id);

  sendResponse<IBlog>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Donation Category rtive successfully  ',
    data: result,
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  //
  const id = req.params.id;
  const updatedData = req.body;
  console.log(id);

  const result = await BlogService.updateBlog(id, updatedData);

  sendResponse<IBlog>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User delete successfully  ',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions
  const { id } = req.params;

  const result = await BlogService.deleteBlog(id);

  sendResponse<IBlog>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User delete successfully  ',
    data: result,
  });
});
export const BlogController = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  getMyBlog,
  updateBlog,
  deleteBlog,
};
