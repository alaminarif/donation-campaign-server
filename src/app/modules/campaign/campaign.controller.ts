import { Request, Response } from 'express';
import catchAsync from '../../../share/catchAsync';

import sendResponse from '../../../share/sendResponse';

import httpStatus from 'http-status';

import { paginationFields } from '../../../constants/pagination';
import pick from '../../../share/pick';
import { CampaignService } from './campaign.service';
import { ICampaign } from './campaign.interface';
import { campaignFilterableFields } from './campaign.constant';

const createCampaign = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;

  const result = await CampaignService.createCampaign(user);

  sendResponse<ICampaign>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'donationa categories created successfully  ',
    data: result,
  });
});

const getAllCampaign = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions

  const filters = pick(req.query, campaignFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CampaignService.getAllCampaign(
    filters,
    paginationOptions
  );

  sendResponse<ICampaign[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Donation Category retrive successfully  ',
    meta: result?.meta,
    data: result?.data,
  });
});

const getSingleCampaign = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions
  const { id } = req.params;

  const result = await CampaignService.getSingleCampaign(id);

  sendResponse<ICampaign>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Donation Category rtive successfully  ',
    data: result,
  });
});

const updateCampaign = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions
  const { id } = req.params;
  const updatedData = req.body;

  const result = await CampaignService.updateCampaign(id, updatedData);

  sendResponse<ICampaign>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User delete successfully  ',
    data: result,
  });
});

const deleteCampaign = catchAsync(async (req: Request, res: Response) => {
  // paginationOptions
  const { id } = req.params;

  const result = await CampaignService.deleteCampaign(id);

  sendResponse<ICampaign>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User delete successfully  ',
    data: result,
  });
});

export const CampaignController = {
  createCampaign,
  getAllCampaign,
  getSingleCampaign,
  updateCampaign,
  deleteCampaign,
};
