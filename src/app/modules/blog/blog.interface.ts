import { Model, Types } from 'mongoose';
import { IComment } from '../comment/comment.interface';

export type IBlog = {
  image: string;
  title: string;
  description: string;
  date: Date;
  helpPeople: boolean;
  author: string;
  comment: Types.ObjectId | IComment;
};

export type BlogModel = Model<IBlog, Record<string, unknown>>;

export type IBlogFilters = {
  searchTerm?: string;
};
