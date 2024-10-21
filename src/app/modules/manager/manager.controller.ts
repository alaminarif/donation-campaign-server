import httpStatus from 'http-status';

import sendResponse from '../../../utils/sendResponse';
import catchAsync from '../../../utils/catchAsync';
import { Request, Response } from 'express';
import pick from '../../../utils/pick';
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

const getSingleManager = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;

  const result = await ManagerService.getSingleManagerFromDB(email);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin retrive successfully  ',
    data: result,
  });
});

const updateManager = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  console.log('manage email :', email);
  const { manager } = req.body;
  // console.log('admin : ', id);
  const result = await ManagerService.updateManagerIntroDB(email, manager);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Manager is updated successfully',
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
  getSingleManager,
  updateManager,
  deleteManager,
};
