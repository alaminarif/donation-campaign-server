import { Model } from 'mongoose';

export type IContact = {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
};

export type ContactModel = Model<IContact, Record<string, unknown>>;

export type IContactFilters = {
  searchTerm?: string;
};
