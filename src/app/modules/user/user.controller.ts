import catchAsync from '../../utils/catchAsync';
import { UserService } from './user.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

const createAdmin = catchAsync(async (req, res) => {
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

const createManager = catchAsync(async (req, res) => {
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

const createVolunteer = catchAsync(async (req, res) => {
  const { password, volunteer: volunteerData } = req.body;
  const result = await UserService.createVolunteerIntoDB(
    password,
    volunteerData
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Volunteer created successfully  ',
    data: result,
  });
});

const createDonor = catchAsync(async (req, res) => {
  const { password, donor: donorData } = req.body;
  const result = await UserService.createDonorIntoDB(password, donorData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'donor created successfully  ',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
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
  createVolunteer,
  createDonor,
  getMe,
};
