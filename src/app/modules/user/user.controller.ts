import { Request, Response } from 'express';
import catchAsync from '../../../share/catchAsync';
import { UserService } from './user.service';
import httpStatus from 'http-status';
import { IUser } from './user.interface';
import sendResponse from '../../../share/sendResponse';
import pick from '../../../share/pick';
import { paginationFields } from '../../../constants/pagination';
import { userFilterableFields } from './user.constant';

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions

  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await UserService.getAllUser(filters, paginationOptions);

  sendResponse<IUser[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User retrive successfully  ',
    meta: result?.meta,
    data: result?.data,
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions
  const email = req.user?.userEmail;

  console.log(req.user);

  const result = await UserService.getMyProfile(email);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User retrive successfully  ',
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions
  const email = req.user?.userEmail;
  const updatedData = req.body;

  const result = await UserService.updateProfile(email, updatedData);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Updated successfully  ',
    data: result,
  });
});
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions
  const { id } = req.params;

  const result = await UserService.deleteUser(id);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User delete successfully  ',
    data: result,
  });
});

export const UserController = {
  getAllUser,
  getMyProfile,
  updateProfile,
  deleteUser,
};
