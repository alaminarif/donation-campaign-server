import httpStatus from 'http-status';
import { IAdmin } from './admin.interface';
import { AdminService } from './admin.service';
import sendResponse from '../../../share/sendResponse';
import catchAsync from '../../../share/catchAsync';
import { Request, Response } from 'express';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const admin = req.body;
  // const us = req.headers.authorization;
  // console.log('us', us, req.user);

  const result = await AdminService.createAdmin(admin);

  sendResponse<IAdmin>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'admin created successfully  ',
    data: result,
  });
});

export const AdminController = {
  createAdmin,
};
