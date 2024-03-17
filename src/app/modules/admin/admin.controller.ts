import httpStatus from 'http-status';
import { IAdmin } from './admin.interface';
import { AdminService } from './admin.service';
import sendResponse from '../../../share/sendResponse';
import catchAsync from '../../../share/catchAsync';
import { Request, Response } from 'express';
import config from '../../../config';
import { ILoginResponse, IRefreshTokenResponse } from '../auth/auth.interface';

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

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  console.log('user', req.user);
  const result = await AdminService.loginAdmin(loginData);

  const { refreshToken, ...others } = result;
  console.log('res', refreshToken);

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User loggedin successfully !',
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AdminService.refreshToken(refreshToken);

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User lohggedin successfully !',
    data: result,
  });
});
export const AdminController = {
  createAdmin,
  loginAdmin,
  refreshToken,
};
