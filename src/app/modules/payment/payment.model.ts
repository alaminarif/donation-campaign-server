import mongoose, { Schema } from 'mongoose';
import { IPayment } from './payment.interface';

const PaymentSchema: Schema = new Schema<IPayment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    donation: {
      type: Schema.Types.ObjectId,
      ref: 'Donation',
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compile Payment model
export const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);
