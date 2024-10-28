import { TCategory, TPaymentMethod } from './donation.interface';

export const PaymentMethod: TPaymentMethod[] = [
  'Bank Transfer',
  'Credit Card',
  'PayPal',
  'Bkash',
  'Nagad',
];

export const Category: TCategory[] = ['One-time', 'Recurring'];

export const DonationSearchableFields = ['amount', 'title', 'category'];
export const DonationFilterableFields = ['searchTerm', 'category'];
