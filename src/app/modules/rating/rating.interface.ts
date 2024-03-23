import mongoose, { Model } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IRating = {
  user: mongoose.Types.ObjectId | IUser;
  value: number;
};

export type IRatingModel = Model<IRating, Record<string, unknown>>;

export type IRatingFilters = {
  searchTerm?: string;
};