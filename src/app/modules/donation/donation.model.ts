import { Schema, model } from 'mongoose';
import { DonationModel, TDonation } from './donation.interface';

const DonationSchema = new Schema<TDonation, DonationModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    image: {
      type: String,
      require: true,
    },
    amount: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Donation = model<TDonation, DonationModel>(
  'Donation',
  DonationSchema
);
