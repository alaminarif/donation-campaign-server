import { Schema, model } from 'mongoose';
import {
  DonationCategoryModel,
  IDonationCategory,
} from './donationCategory.interface';

const DonationCategorySchema = new Schema<
  IDonationCategory,
  DonationCategoryModel
>(
  {
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
  },
  {
    timestamps: true,
  }
);

export const DonationCategory = model<IDonationCategory, DonationCategoryModel>(
  'DonationCategory',
  DonationCategorySchema
);
