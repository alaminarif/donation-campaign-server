import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../share/catchAsync';
import pick from '../../../share/pick';
import sendResponse from '../../../share/sendResponse';
import { commentFilterableFields } from './comment.constant';
import { IComment } from './comment.interface';
import { CommentService } from './comment.service';
import { Request, Response } from 'express';

const createComment = catchAsync(async (req: Request, res: Response) => {
  const Comment = req.body;
  const result = await CommentService.createComment(Comment);

  sendResponse<IComment>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment created successfully  ',
    data: result,
  });
});

const getAllComment = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions

  const filters = pick(req.query, commentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CommentService.getAllComment(filters, paginationOptions);

  sendResponse<IComment[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment retrive successfully  ',
    meta: result?.meta,
    data: result?.data,
  });
});

const getMyComment = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions
  const id = req.user?._id;
  // const user = req.user;
  // console.log(user);
  // const email = req.query.email;

  // console.log(email);

  const result = await CommentService.getMyComment(id);

  sendResponse<IComment>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment retrive successfully  ',
    data: result,
  });
});

const updateComment = catchAsync(async (req: Request, res: Response) => {
  //
  const updatedData = req.body;
  const id = req.user?._id;

  const result = await CommentService.updateComment(id, updatedData);

  sendResponse<IComment>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment Updated successfully  ',
    data: result,
  });
});

const deleteComment = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions
  const { id } = req.params;

  const result = await CommentService.deleteComment(id);

  sendResponse<IComment>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment delete successfully  ',
    data: result,
  });
});

export const CommentController = {
  createComment,
  getAllComment,
  getMyComment,
  updateComment,
  deleteComment,
};
