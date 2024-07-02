import mongoose, { Model } from 'mongoose';
import { TUser } from '../user/user.interface';

export type IRating = {
  user: mongoose.Types.ObjectId | TUser;
  value: number;
};

export type IRatingModel = Model<IRating, Record<string, unknown>>;

export type IRatingFilters = {
  searchTerm?: string;
};
