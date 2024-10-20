import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import { UserService } from './user.service';
import httpStatus from 'http-status';
import { TUser } from './user.interface';
import sendResponse from '../../../utils/sendResponse';
import pick from '../../../utils/pick';
import { paginationFields } from '../../../constants/pagination';
import { userFilterableFields } from './user.constant';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { password, admin: adminData } = req.body;

  // const us = req.headers.authorization;
  // console.log('us', us, req.user);

  const result = await UserService.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'admin created successfully  ',
    data: result,
  });
});

const createManager = catchAsync(async (req: Request, res: Response) => {
  const { password, manager: managerData } = req.body;

  // const us = req.headers.authorization;
  // console.log('us', us, req.user);

  const result = await UserService.createManagerIntoDB(password, managerData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'admin created successfully  ',
    data: result,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions

  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await UserService.getAllUser(filters, paginationOptions);

  sendResponse<TUser[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User retrive successfully  ',
    meta: result?.meta,
    data: result?.data,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions
  const { userEmail, role } = req.user!;

  const result = await UserService.getMe(userEmail, role);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Manager retrive successfully  ',
    data: result,
  });
});

export const UserController = {
  createAdmin,
  createManager,
  getAllUser,
  getMe,
};
