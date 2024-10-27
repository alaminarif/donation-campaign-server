import { Schema, model } from 'mongoose';
import { CampaignModel, TCampaign } from './campaign.interface';
import { Category, Status } from './campaign.constant';

const CampaignSchema = new Schema<TCampaign, CampaignModel>(
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

    currentAmount: {
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
      required: true,
    },

    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: {
        values: Category,
        message: '{VALUE} is not a valid category',
      },
    },
    status: {
      type: String,
      enum: {
        values: Status,
        message: '{VALUE} is not a valid status',
      },
    },

    volunteerOpportunity: {
      type: String,
    },

    manager: {
      type: Schema.Types.ObjectId,
      ref: 'Manager',
    },

    img: {
      type: String,
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

export const Campaign = model<TCampaign, CampaignModel>(
  'Campaign',
  CampaignSchema
);
