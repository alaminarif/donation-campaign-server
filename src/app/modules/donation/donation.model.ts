import { Schema, model } from 'mongoose';
import { DonationModel, TDonation } from './donation.interface';
import { PaymentMethod } from './donation.constant';

const DonationSchema = new Schema<TDonation, DonationModel>(
  {
    amount: {
      type: String,
      require: true,
    },

    paymentMethod: {
      type: String,
      enum: PaymentMethod,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    category: {
      type: String,
      require: true,
    },

    anonymous: {
      type: Boolean,
      default: false,
    },

    // title: {
    //   type: String,
    //   require: true,
    // },

    message: {
      type: String,
      required: true,
    },

    campaign: {
      type: Schema.Types.ObjectId,
      ref: 'Campaign',
      required: true,
    },

    donor: {
      type: Schema.Types.ObjectId,
      ref: 'Donor',
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
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
