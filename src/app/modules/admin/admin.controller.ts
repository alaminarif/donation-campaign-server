import httpStatus from 'http-status';
import { AdminService } from './admin.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const getAllAdmin = catchAsync(async (req, res) => {
  // paginationOptions

  const result = await AdminService.getAllAdminsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const { email } = req.params;

  const result = await AdminService.getSingleAdminFromDB(email);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin retrive successfully  ',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { email } = req.params;
  const { admin } = req.body;
  const result = await AdminService.updateAdminIntroDB(email, admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is updated successfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
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
