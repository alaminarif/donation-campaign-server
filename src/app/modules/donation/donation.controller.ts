import catchAsync from '../../utils/catchAsync';
import { DonationService } from './donation.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createDonation = catchAsync(async (req, res) => {
  const user = req.body;

  const result = await DonationService.createDonationIntoDB(user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'donation created successfully  ',
    data: result,
  });
});

const getAllDonation = catchAsync(async (req, res) => {
  const result = await DonationService.getAllDonationFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Donation retrive successfully  ',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleDonation = catchAsync(async (req, res) => {
  // paginationOptions
  const { id } = req.params;

  const result = await DonationService.getSingleDonationFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Donation rtive successfully  ',
    data: result,
  });
});

const updateDonation = catchAsync(async (req, res) => {
  // paginationOptions
  const id = req.user?._id;
  const updatedData = req.body;

  const result = await DonationService.updateDonationIntoDB(id, updatedData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'updated donotion successfully  ',
    data: result,
  });
});

const deleteDonation = catchAsync(async (req, res) => {
  // paginationOptions
  const { id } = req.params;

  const result = await DonationService.deleteDonationFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'donotion delete successfully  ',
    data: result,
  });
});

export const DonationController = {
  createDonation,
  getAllDonation,
  getSingleDonation,
  updateDonation,
  deleteDonation,
};
