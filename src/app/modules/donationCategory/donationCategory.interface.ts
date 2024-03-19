import { Model } from 'mongoose';

export type IDonationCategory = {
  image: string;
  amount: string;
  category: string;
  title: string;
};

export type DonationCategoryModel = Model<
  IDonationCategory,
  Record<string, unknown>
>;
export type IDonationCategoryFilters = {
  searchTerm?: string;
};
