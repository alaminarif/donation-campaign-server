import { Model, Types } from 'mongoose';

export type ICampaign = {
  name: string;
  description: string;
  targetAmount: number;
  startDate: Date;
  endDate: Date;
  currentAmount: number;
  location: string;
  donationCategories: Types.ObjectId;
};

export type CampaignModel = Model<ICampaign, Record<string, unknown>>;

export type ICampaignFilters = {
  searchTerm?: string;
};
