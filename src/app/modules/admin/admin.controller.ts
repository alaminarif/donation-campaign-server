import httpStatus from 'http-status';
import { TAdmin } from './admin.interface';
import { AdminService } from './admin.service';
import sendResponse from '../../../utils/sendResponse';
import catchAsync from '../../../utils/catchAsync';
import { Request, Response } from 'express';
import { adminFilterableFields } from './admin.constant';
import pick from '../../../utils/pick';
import { paginationFields } from '../../../constants/pagination';

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions

  const filters = pick(req.query, adminFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AdminService.getAllAdminFromDB(
    filters,
    paginationOptions
  );

  sendResponse<TAdmin[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin retrive successfully  ',
    meta: result?.meta,
    data: result?.data,
  });
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;

  const result = await AdminService.getSingleAdminFromDB(email);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin retrive successfully  ',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const { admin } = req.body;
  console.log('admin : ', email);
  const result = await AdminService.updateAdminIntroDB(email, admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is updated successfully',
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
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
