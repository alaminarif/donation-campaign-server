import { Schema, model } from 'mongoose';
import { CampaignModel, ICampaign } from './campaign.interface';

const CampaignSchema = new Schema<ICampaign, CampaignModel>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    targetAmount: {
      type: String,
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
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    donationCategories: {
      type: Schema.Types.ObjectId,
      ref: 'DonationCategory',
    },
  },
  {
    timestamps: true,
  }
);

export const Campaign = model<ICampaign, CampaignModel>(
  'Campaign',
  CampaignSchema
);
