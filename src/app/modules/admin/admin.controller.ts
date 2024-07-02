import httpStatus from 'http-status';
import { TAdmin } from './admin.interface';
import { AdminService } from './admin.service';
import sendResponse from '../../../share/sendResponse';
import catchAsync from '../../../share/catchAsync';
import { Request, Response } from 'express';
// import config from '../../../config';
// import { TLoginResponse, IRefreshTokenResponse } from '../auth/auth.interface';
import { adminFilterableFields } from './admin.constant';
import pick from '../../../share/pick';
import { paginationFields } from '../../../constants/pagination';

// const loginAdmin = catchAsync(async (req: Request, res: Response) => {
//   const { ...loginData } = req.body;
//   console.log('Admin', req.user);
//   const result = await AdminService.loginAdmin(loginData);

//   const { refreshToken, ...others } = result;
//   console.log('res', refreshToken);

//   const cookieOptions = {
//     secure: config.env === 'production',
//     httpOnly: true,
//   };

//   res.cookie('refreshToken', refreshToken, cookieOptions);

//   sendResponse<TLoginResponse>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Admin loggedin successfully !',
//     data: others,
//   });
// });

// const refreshToken = catchAsync(async (req: Request, res: Response) => {
//   const { refreshToken } = req.cookies;

//   const result = await AdminService.refreshToken(refreshToken);

//   const cookieOptions = {
//     secure: config.env === 'production',
//     httpOnly: true,
//   };

//   res.cookie('refreshToken', refreshToken, cookieOptions);

//   sendResponse<IRefreshTokenResponse>(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Admin lohggedin successfully !',
//     data: result,
//   });
// });

// const changePassword = catchAsync(async (req: Request, res: Response) => {
//   const Admin = req.user;
//   console.log('Admin : ', Admin);
//   const { ...passwordData } = req.body;
//   const result = await AdminService.changePassword(Admin, passwordData);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'changePassword successfully  ',
//     data: result,
//   });
// });

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

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions
  const email = req.user?.adminEmail;
  console.log(' : ', email);

  const result = await AdminService.getMyProfile(email);

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
  // loginAdmin,
  // refreshToken,
  // changePassword,
  getAllAdmin,
  getMyProfile,
  updateProfile,
  deleteAdmin,
};
