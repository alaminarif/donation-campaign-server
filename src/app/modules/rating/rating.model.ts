import mongoose, { Schema } from 'mongoose';
import { IRating } from './rating.interface';

const RatingSchema: Schema = new Schema<IRating>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    value: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    }, // Assuming a rating scale from 1 to 5
  },
  {
    timestamps: true,
  }
);

export const Rating = mongoose.model<IRating>('Rating', RatingSchema);
