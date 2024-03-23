import mongoose, { Model } from 'mongoose';

export type IPayment = {
  user: mongoose.Types.ObjectId;
  amount: number;
  donation: mongoose.Types.ObjectId;
  transactionId: string;
};

export type PaymentModel = Model<IPayment, Record<string, unknown>>;

export type IPaymentFilters = {
  searchTerm?: string;
};
