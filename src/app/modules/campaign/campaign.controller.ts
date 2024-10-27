import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';
import { CampaignService } from './campaign.service';

const createCampaign = catchAsync(async (req, res) => {
  const campaign = req.body;

  const result = await CampaignService.createCampaignIntoDB(campaign);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'donationa categories created successfully  ',
    data: result,
  });
});

const getAllCampaign = catchAsync(async (req, res) => {
  // paginationOptions

  const result = await CampaignService.getAllCampaignFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Campaign retrive successfully  ',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleCampaign = catchAsync(async (req, res) => {
  // paginationOptions
  const { id } = req.params;

  const result = await CampaignService.getSingleCampaignFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Campaign rtive successfully  ',
    data: result,
  });
});

const updateCampaign = catchAsync(async (req, res) => {
  // paginationOptions
  const { id } = req.params;
  const updatedData = req.body;

  const result = await CampaignService.updateCampaign(id, updatedData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Campaign updated successfully  ',
    data: result,
  });
});

const deleteCampaign = catchAsync(async (req, res) => {
  // paginationOptions
  const { id } = req.params;

  const result = await CampaignService.deleteCampaign(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Campaign delete successfully  ',
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
