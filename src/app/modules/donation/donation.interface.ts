import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IDonation = {
  user: Types.ObjectId | IUser;
  image: string;
  amount: string;
  category: string;
  title: string;
  description: string;
};

export type DonationModel = Model<IDonation, Record<string, unknown>>;

export type IDonationFilters = {
  searchTerm?: string;
};
