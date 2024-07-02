import { Model, Types } from 'mongoose';
import { TUser } from '../user/user.interface';

export type IComment = {
  user: Types.ObjectId | TUser;
  content: string;
};

export type CommentModel = Model<IComment, Record<string, unknown>>;

export type ICommentFilters = {
  searchTerm?: string;
};

// email: {
//     userEmail: string;
//   };
