import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IComment = {
  user: Types.ObjectId | IUser;
  content: string;
  // createdAt: Date;
  // updatedAt: Date;
};

export type CommentModel = Model<IComment, Record<string, unknown>>;

export type ICommentFilters = {
  searchTerm?: string;
};
