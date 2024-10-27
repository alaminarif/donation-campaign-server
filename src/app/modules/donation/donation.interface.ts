import { Model, Types } from 'mongoose';
import { TUser } from '../user/user.interface';

export type TDonation = {
  user: Types.ObjectId | TUser;
  image: string;
  amount: string;
  category: string;
  title: string;
  description: string;
};

export type DonationModel = Model<TDonation, Record<string, unknown>>;

export type TDonationFilters = {
  searchTerm?: string;
};
