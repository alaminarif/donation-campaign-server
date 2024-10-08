import httpStatus from 'http-status';

import sendResponse from '../../../share/sendResponse';
import catchAsync from '../../../share/catchAsync';
import { Request, Response } from 'express';
import pick from '../../../share/pick';
import { paginationFields } from '../../../constants/pagination';
import { managerFilterableFields } from './manager.constant';
import { ManagerService } from './manager.service';
import { TManager } from './manager.interface';

const getAllManager = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions

  const filters = pick(req.query, managerFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ManagerService.getAllmanager(filters, paginationOptions);

  sendResponse<TManager[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin retrive successfully  ',
    meta: result?.meta,
    data: result?.data,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions
  const email = req.user?.adminEmail;
  console.log(' : ', email);

  const result = await ManagerService.getMe(email);

  sendResponse<TManager>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin retrive successfully  ',
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions
  const email = req.user?.adminEmail;
  const updatedData = req.body;

  const result = await ManagerService.updateProfile(email, updatedData);

  sendResponse<TManager>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin Updated successfully  ',
    data: result,
  });
});

const deleteManager = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions
  const { email } = req.params;

  const result = await ManagerService.deleteManagerFromDB(email);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin delete successfully  ',
    data: result,
  });
});
export const ManagerController = {
  getAllManager,
  getMe,
  updateProfile,
  deleteManager,
};
