import { Schema, model } from 'mongoose';
import { CommentModel, IComment } from './comment.interface';

const CommentSchema: Schema = new Schema<IComment, CommentModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Comment = model<IComment, CommentModel>('Comment', CommentSchema);

// email: {
//   userEmail: String,
// },
// createdAt: {
//   type: Date,
//   default: Date.now,
// },
// updatedAt: {
//   type: Date,
//   default: Date.now,
// },
