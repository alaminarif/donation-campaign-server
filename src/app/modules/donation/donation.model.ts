import { Schema, model } from 'mongoose';
import { DonationModel, IDonation } from './donation.interface';

const DonationSchema = new Schema<IDonation, DonationModel>(
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

export const Donation = model<IDonation, DonationModel>(
  'Donation',
  DonationSchema
);
