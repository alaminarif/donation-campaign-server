import { TCampaign } from './campaign.interface';
import { Campaign } from './campaign.model';
import { campaignSearchableFields } from './campaign.constant';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import QueryBuilder from '../../builder/QueryBuilder';

const createCampaignIntoDB = async (payload: TCampaign) => {
  const result = await Campaign.create(payload);
  return result;
};

const getAllCampaignFromDB = async (query: Record<string, unknown>) => {
  //

  const campaignQuery = new QueryBuilder(Campaign.find(), query)
    .search(campaignSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await campaignQuery.modelQuery;
  const meta = await campaignQuery.countTotal();
  return {
    meta,
    result,
  };
};

const getSingleCampaignFromDB = async (id: string) => {
  const result = await Campaign.findById({ _id: id });
  return result;
};

const updateCampaignIntoDB = async (
  id: string,
  paylaoad: Partial<TCampaign>
) => {
  //
  const query = { _id: id };
  const isExist = await Campaign.findOne(query);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Campaign does't exist ");
  }

  const result = await Campaign.findByIdAndUpdate(query, paylaoad, {
    new: true,
  });

  return result;
};

const deleteCampaignFromDB = async (id: string): Promise<TCampaign | null> => {
  const result = await Campaign.findByIdAndDelete({ _id: id });
  return result;
};
export const CampaignService = {
  createCampaignIntoDB,
  getAllCampaignFromDB,
  getSingleCampaignFromDB,
  updateCampaignIntoDB,
  deleteCampaignFromDB,
};
