import { Model, Types } from 'mongoose';

export type TPaymentMethod =
  | 'Bank Transfer'
  | 'Credit Card'
  | 'PayPal'
  | 'Bkash'
  | 'Nagad';

export type TCategory = 'Recurring' | 'One-time';

export type TDonation = {
  amount: string;
  paymentMethod: TPaymentMethod;
  date: Date;
  category: TCategory;
  anonymous: boolean;
  message: string;
  campaign: Types.ObjectId;
  donor: Types.ObjectId;
  isDeleted: boolean;
};

export type DonationModel = Model<TDonation, Record<string, unknown>>;

export type TDonationFilters = {
  searchTerm?: string;
};
