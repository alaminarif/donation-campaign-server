import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IComment = {
  user: Types.ObjectId | IUser;
  content: string;
};

export type CommentModel = Model<IComment, Record<string, unknown>>;

export type ICommentFilters = {
  searchTerm?: string;
};

// email: {
//     userEmail: string;
//   };
