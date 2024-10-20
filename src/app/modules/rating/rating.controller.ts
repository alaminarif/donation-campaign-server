import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';

import sendResponse from '../../../utils/sendResponse';

import httpStatus from 'http-status';

import { paginationFields } from '../../../constants/pagination';
import pick from '../../../utils/pick';
import { RatingService } from './rating.service';
import { IRating } from './rating.interface';

const createRating = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;

  const result = await RatingService.createRating(user);

  sendResponse<IRating>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'donationa categories created successfully  ',
    data: result,
  });
});

const getAllRating = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions

  const paginationOptions = pick(req.query, paginationFields);

  const result = await RatingService.getAllRating(paginationOptions);

  sendResponse<IRating[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Donation Category retrive successfully  ',
    meta: result?.meta,
    data: result?.data,
  });
});

const getSingleRating = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions
  const { id } = req.params;

  const result = await RatingService.getSingleRating(id);

  sendResponse<IRating>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Donation Category rtive successfully  ',
    data: result,
  });
});

const updateRating = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions
  const id = req.user?._id;

  const updatedData = req.body;

  const result = await RatingService.updateRating(id, updatedData);

  sendResponse<IRating>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User delete successfully  ',
    data: result,
  });
});

const deleteRating = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions
  const { id } = req.params;

  const result = await RatingService.deleteRating(id);

  sendResponse<IRating>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User delete successfully  ',
    data: result,
  });
});

export const RatingController = {
  createRating,
  getAllRating,
  getSingleRating,
  updateRating,
  deleteRating,
};
