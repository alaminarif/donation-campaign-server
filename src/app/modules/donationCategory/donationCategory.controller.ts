import { Request, Response } from 'express';
import catchAsync from '../../../share/catchAsync';
import { DonationCategoryService } from './donationCategory.service';
import sendResponse from '../../../share/sendResponse';
import { IDonationCategory } from './donationCategory.interface';
import httpStatus from 'http-status';
import { DonationCategoryFilterableFields } from './donationCategory.constant';
import { paginationFields } from '../../../constants/pagination';
import pick from '../../../share/pick';

const createDonationCategory = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.body;

    const result = await DonationCategoryService.createDonationCategory(user);

    sendResponse<IDonationCategory>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'donationa categories created successfully  ',
      data: result,
    });
  }
);

const getAllDonationCategory = catchAsync(
  async (req: Request, res: Response) => {
    // paginationOptions

    const filters = pick(req.query, DonationCategoryFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await DonationCategoryService.getAllDonationCategory(
      filters,
      paginationOptions
    );

    sendResponse<IDonationCategory[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Donation Category retrive successfully  ',
      meta: result?.meta,
      data: result?.data,
    });
  }
);

const getSingleDonationCategory = catchAsync(
  async (req: Request, res: Response) => {
    // paginationOptions
    const { id } = req.params;

    const result = await DonationCategoryService.getSingleDonationCategory(id);

    sendResponse<IDonationCategory>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Donation Category rtive successfully  ',
      data: result,
    });
  }
);

const updateDonationCategory = catchAsync(
  async (req: Request, res: Response) => {
    // paginationOptions
    const { id } = req.params;
    const updatedData = req.body;

    const result = await DonationCategoryService.updateDonationCategory(
      id,
      updatedData
    );

    sendResponse<IDonationCategory>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User delete successfully  ',
      data: result,
    });
  }
);
const deleteDonationCategory = catchAsync(
  async (req: Request, res: Response) => {
    // paginationOptions
    const { id } = req.params;

    const result = await DonationCategoryService.deleteDonationCategory(id);

    sendResponse<IDonationCategory>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User delete successfully  ',
      data: result,
    });
  }
);
export const DonationCategoryController = {
  createDonationCategory,
  getAllDonationCategory,
  getSingleDonationCategory,
  updateDonationCategory,
  deleteDonationCategory,
};
