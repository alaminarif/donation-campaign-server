import { Schema, model } from 'mongoose';
import { CommentModel, IComment } from './comment.interface';

const CommentSchema: Schema = new Schema<IComment, CommentModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    email: {
      userEmail: String,
    },
    content: {
      type: String,
      required: true,
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  {
    timestamps: true,
  }
);

export const Comment = model<IComment, CommentModel>('Comment', CommentSchema);
