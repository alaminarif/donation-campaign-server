import httpStatus from 'http-status';
import catchAsync from '../../../share/catchAsync';
import sendResponse from '../../../share/sendResponse';
import { IUser } from '../user/user.interface';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { ILoginResponse, IRefreshTokenResponse } from './auth.interface';
import config from '../../../config';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const us = req.headers.authorization;
  console.log('us', us, req.user);

  const result = await AuthService.createUser(user);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'user created successfully  ',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);

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
  const reslut = await AuthService.refreshToken(refreshToken);

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User loggedin successfully !',
    data: reslut,
  });
});
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  console.log('user : ', user);
  const { ...passwordData } = req.body;
  const result = await AuthService.changePassword(user, passwordData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'changePassword successfully  ',
    data: result,
  });
});

export const AuthController = {
  createUser,
  loginUser,
  refreshToken,
  changePassword,
};
