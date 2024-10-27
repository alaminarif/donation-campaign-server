import { TCategory, TStatus } from './campaign.interface';

export const Category: TCategory[] = ['Health', 'Education', 'Disaster Relief'];
export const Status: TStatus[] = ['UPCOMING', 'ACTIVE', 'COMPLETED'];

export const campaignSearchableFields = [
  'location',
  'currentAmount',
  'targetAmount',
  ' name',
];
export const campaignFilterableFields = [
  'searchTerm',
  'category',
  'currentAmount',
  'targetAmount',
];
