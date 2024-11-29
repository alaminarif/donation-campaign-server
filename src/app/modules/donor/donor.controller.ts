import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { DonorService } from './donor.service';
import catchAsync from '../../utils/catchAsync';

const getAllDonor = catchAsync(async (req, res) => {
  // paginationOptions

  const result = await DonorService.getAllDonor(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donor are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleDonor = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await DonorService.getSingleDonorFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Donor retrive successfully  ',
    data: result,
  });
});

const updateDonor = catchAsync(async (req, res) => {
  const { email } = req.params;
  const { donor } = req.body;
  const result = await DonorService.updateDonorIntroDB(email, donor);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donor is updated successfully',
    data: result,
  });
});

const deleteDonor = catchAsync(async (req, res) => {
  // paginationOptions
  const { email } = req.params;

  const result = await DonorService.deleteDonorFromDB(email);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin delete successfully  ',
    data: result,
  });
});

export const DonorController = {
  getAllDonor,
  getSingleDonor,
  updateDonor,
  deleteDonor,
};
