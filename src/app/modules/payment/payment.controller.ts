import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';

import sendResponse from '../../utils/sendResponse';

import httpStatus from 'http-status';

import { paginationFields } from '../../constants/pagination';
import pick from '../../utils/pick';
import { PaymentService } from './payment.service';
import { IPayment } from './payment.interface';
import { paymentFilterableFields } from './payment.constant';

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;

  const result = await PaymentService.createPayment(user);

  sendResponse<IPayment>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'donationa categories created successfully  ',
    data: result,
  });
});

const getAllPayment = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions

  const filters = pick(req.query, paymentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await PaymentService.getAllPayment(filters, paginationOptions);

  sendResponse<IPayment[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Donation Category retrive successfully  ',
    meta: result?.meta,
    data: result?.data,
  });
});

const getSinglePayment = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions
  const { id } = req.params;

  const result = await PaymentService.getSinglePayment(id);

  sendResponse<IPayment>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Donation Category rtive successfully  ',
    data: result,
  });
});

const updatePayment = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions
  const { id } = req.params;
  const updatedData = req.body;

  const result = await PaymentService.updatePayment(id, updatedData);

  sendResponse<IPayment>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User delete successfully  ',
    data: result,
  });
});
const deletePayment = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions
  const { id } = req.params;

  const result = await PaymentService.deletePayment(id);

  sendResponse<IPayment>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User delete successfully  ',
    data: result,
  });
});
export const PaymentController = {
  createPayment,
  getAllPayment,
  getSinglePayment,
  updatePayment,
  deletePayment,
};
