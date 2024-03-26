import { Model, Types } from 'mongoose';

export type ICampaign = {
  name: string;
  description: string;
  targetAmount: string;
  startDate: Date;
  endDate: Date;
  currentAmount: string;
  location: string;
  donationCategories: Types.ObjectId;
};

export type CampaignModel = Model<ICampaign, Record<string, unknown>>;

export type ICampaignFilters = {
  searchTerm?: string;
};
