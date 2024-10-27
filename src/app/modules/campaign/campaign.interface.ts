import { Model, Types } from 'mongoose';

export type TDays = 'Sat' | 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
export type TCategory = 'Health' | 'Education' | 'Disaster Relief';
export type TStatus = 'UPCOMING' | 'ACTIVE' | 'COMPLETED';

export type TCampaign = {
  name: string;
  description: string;
  targetAmount: string;
  currentAmount: string;
  startDate: Date;
  endDate: Date;
  location: string;
  category: TCategory;
  status: TStatus;
  volunteerOpportunity?: string;
  manager: Types.ObjectId;
  img: string;
  isDeleted: boolean;
};

export type CampaignModel = Model<TCampaign, Record<string, unknown>>;

export type TCampaignFilters = {
  searchTerm?: string;
};
