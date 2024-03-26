import mongoose, { Schema } from 'mongoose';
import { IBlog } from './blog.interface';

const BlogSchema = new Schema<IBlog>({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  helpPeople: {
    type: Boolean,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    required: true,
  },
});

export const Blog = mongoose.model<IBlog>('Blog', BlogSchema);
