/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { TUser } from './user.interface';
import { User } from './user.model';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TManager } from '../manager/manager.interface';
import { Manager } from '../manager/manager.model';
import { TVolunteer } from '../volunteer/volunteer.interface';
import { Volunteer } from '../volunteer/volunteer.model';
import { TDonor } from '../donor/donor.interface';
import { Donor } from '../donor/donor.model';

const createAdminIntoDB = async (password: string, adminData: TAdmin) => {
  //
  const userData: Partial<TUser> = {};

  userData.role = 'admin';
  userData.password = password;
  userData.email = adminData.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    adminData.email = newUser[0].email;
    adminData.user = newUser[0]._id;

    const newAdmin = await Admin.create([adminData], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createManagerIntoDB = async (password: string, managerData: TManager) => {
  const userData: Partial<TUser> = {};

  userData.role = 'manager';
  userData.password = password;
  userData.email = managerData.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    managerData.email = newUser[0].email;
    managerData.user = newUser[0]._id;

    const newManager = await Manager.create([managerData], { session });

    if (!newManager.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newManager;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const createVolunteerIntoDB = async (
  password: string,
  volunteerData: TVolunteer
) => {
  const userData: Partial<TUser> = {};
  userData.password = password;
  userData.email = volunteerData.email;
  userData.role = 'volunteer';

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    volunteerData.email = newUser[0].email;
    volunteerData.user = newUser[0]._id;

    const newVolunteer = await Volunteer.create([volunteerData], { session });
    if (!newVolunteer.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newVolunteer;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createDonorIntoDB = async (password: string, donorData: TDonor) => {
  const userData: Partial<TUser> = {};
  userData.password = password;
  userData.email = donorData.email;
  userData.role = 'donor';

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    donorData.email = newUser[0].email;
    donorData.user = newUser[0]._id;

    const newVolunteer = await Donor.create([donorData], { session });
    if (!newVolunteer.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create donor');
    }

    await session.commitTransaction();
    await session.endSession();

    return newVolunteer;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMe = async (userEmail: string, role: string) => {
  let result = null;

  if (role === 'admin') {
    result = await Admin.findOne({ email: userEmail }).populate('user');
  }

  if (role === 'donor') {
    result = await Donor.findOne({ email: userEmail }).populate('user');
  }

  if (role === 'manager') {
    result = await Manager.findOne({ email: userEmail }).populate('user');
  }

  if (role === 'volunteer') {
    result = await Volunteer.findOne({ email: userEmail }).populate('user');
  }
  console.log(result);
  return result;
};

export const UserService = {
  createAdminIntoDB,
  createManagerIntoDB,
  createVolunteerIntoDB,
  createDonorIntoDB,
  getMe,
};
