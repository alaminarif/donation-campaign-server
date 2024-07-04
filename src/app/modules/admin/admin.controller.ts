import httpStatus from 'http-status';
import { TAdmin } from './admin.interface';
import { AdminService } from './admin.service';
import sendResponse from '../../../share/sendResponse';
import catchAsync from '../../../share/catchAsync';
import { Request, Response } from 'express';
import { adminFilterableFields } from './admin.constant';
import pick from '../../../share/pick';
import { paginationFields } from '../../../constants/pagination';

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions

  const filters = pick(req.query, adminFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AdminService.getAllAdmin(filters, paginationOptions);

  sendResponse<TAdmin[]>(res, {
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

  const result = await AdminService.getMe(email);

  sendResponse<TAdmin>(res, {
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

  const result = await AdminService.updateProfile(email, updatedData);

  sendResponse<TAdmin>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin Updated successfully  ',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions
  const { email } = req.params;

  const result = await AdminService.deleteAdminFromDB(email);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin delete successfully  ',
    data: result,
  });
});
export const AdminController = {
  getAllAdmin,
  getMe,
  updateProfile,
  deleteAdmin,
};
