import { Request, Response } from 'express';
import catchAsync from '../../../share/catchAsync';
import { UserService } from './user.service';
import httpStatus from 'http-status';
import { TUser } from './user.interface';
import sendResponse from '../../../share/sendResponse';
import pick from '../../../share/pick';
import { paginationFields } from '../../../constants/pagination';
import { userFilterableFields } from './user.constant';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { password, admin: adminData } = req.body;

  // const us = req.headers.authorization;
  // console.log('us', us, req.user);

  const result = await UserService.createAdmin(password, adminData);

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
    message: 'User retrive successfully  ',
    data: result,
  });
});

// const updateProfile = catchAsync(async (req: Request, res: Response) => {
//   // paginationOptions
//   const email = req.user?.userEmail;
//   const updatedData = req.body;

//   const result = await UserService.updateProfile(email, updatedData);

//   sendResponse<TUser>(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'User Updated successfully  ',
//     data: result,
//   });
// });

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions
  const { id } = req.params;

  const result = await UserService.deleteUser(id);

  sendResponse<TUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User delete successfully  ',
    data: result,
  });
});

export const UserController = {
  createAdmin,
  getAllUser,
  getMe,
  // updateProfile,
  deleteUser,
};
