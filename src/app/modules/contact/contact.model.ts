import mongoose, { Schema } from 'mongoose';
import { IContact } from './contact.interface';

const ContactSchema: Schema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
export const Contact = mongoose.model<IContact>('Contact', ContactSchema);
