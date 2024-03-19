import { Schema, model } from 'mongoose';
import { CampaignModel, ICampaign } from './campaign.interface';

const CampaignSchema = new Schema<ICampaign, CampaignModel>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  targetAmount: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
    // default: Date.now,
  },
  endDate: {
    type: Date,
    // required: true,
  },
  currentAmount: {
    type: Number,
    default: 0,
  },
  location: {
    type: String,
    required: true,
  },
  donationCategories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'DonationCategory',
    },
  ],
});

export const Campaign = model<ICampaign, CampaignModel>(
  'Campaign',
  CampaignSchema
);
