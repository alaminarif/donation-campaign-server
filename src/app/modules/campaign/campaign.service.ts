import { SortOrder } from 'mongoose';

import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { ICampaign, ICampaignFilters } from './campaign.interface';
import { Campaign } from './campaign.model';
import { campaignSearchableFields } from './campaign.constant';

const createCampaign = async (
  payload: ICampaign
): Promise<ICampaign | null> => {
  const result = await Campaign.create(payload);
  return result;
};

const getAllCampaign = async (
  filter: ICampaignFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICampaign[]> | null> => {
  //

  const { searchTerm, ...filterData } = filter;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: campaignSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whareConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Campaign.find(whareConditions)
    .skip(skip)
    .limit(limit)
    .sort(sortConditions);

  const total = await Campaign.countDocuments(whareConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCampaign = async (id: string): Promise<ICampaign | null> => {
  const result = await Campaign.findById({ _id: id });
  return result;
};

const updateCampaign = async (
  id: string,
  paylaoad: Partial<ICampaign>
): Promise<ICampaign | null> => {
  const result = await Campaign.findByIdAndUpdate({ _id: id }, paylaoad, {
    new: true,
  });
  return result;
};

const deleteCampaign = async (id: string): Promise<ICampaign | null> => {
  const result = await Campaign.findByIdAndDelete({ _id: id });
  return result;
};
export const CampaignService = {
  createCampaign,
  getAllCampaign,
  getSingleCampaign,
  updateCampaign,
  deleteCampaign,
};
