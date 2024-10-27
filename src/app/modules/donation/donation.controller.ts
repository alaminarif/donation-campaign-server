import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';

import { paginationFields } from '../../../constants/pagination';
import pick from '../../../utils/pick';
import { DonationService } from './donation.service';
import { TDonation } from './donation.interface';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';
import { DonationFilterableFields } from './donation.constant';

const createDonation = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;

  const result = await DonationService.createDonation(user);

  sendResponse<TDonation>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'donationa categories created successfully  ',
    data: result,
  });
});

const getAllDonation = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions

  const filters = pick(req.query, DonationFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await DonationService.getAllDonation(
    filters,
    paginationOptions
  );

  sendResponse<TDonation[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Donation Category retrive successfully  ',
    meta: result?.meta,
    data: result?.data,
  });
});

const getSingleDonation = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions
  const { id } = req.params;

  const result = await DonationService.getSingleDonation(id);

  sendResponse<TDonation>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Donation Category rtive successfully  ',
    data: result,
  });
});

const updateDonation = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions
  const id = req.user?._id;
  const updatedData = req.body;

  const result = await DonationService.updateDonation(id, updatedData);

  sendResponse<TDonation>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User delete successfully  ',
    data: result,
  });
});

const deleteDonation = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions
  const { id } = req.params;

  const result = await DonationService.deleteDonation(id);

  sendResponse<TDonation>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User delete successfully  ',
    data: result,
  });
});

export const DonationController = {
  createDonation,
  getAllDonation,
  getSingleDonation,
  updateDonation,
  deleteDonation,
};
