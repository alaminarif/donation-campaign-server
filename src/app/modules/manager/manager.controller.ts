import httpStatus from 'http-status';

import sendResponse from '../../../utils/sendResponse';
import catchAsync from '../../../utils/catchAsync';
import { Request, Response } from 'express';
import { ManagerService } from './manager.service';

const getAllManager = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions

  const result = await ManagerService.getAllmanager(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'manager are retrieved successfully',
    meta: result.meta,
    data: result.result,
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
