import mongoose from 'mongoose';
import {IAuthor, IPost} from "../controllers/post/types";

const Schema = mongoose.Schema

const AuthorSchema = new Schema<IAuthor>({
  _id: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
  },
});

const PostSchema = new Schema<IPost>({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: []
  },
  viewsCount: {
    type: Number,
    default: 0
  },
  author: AuthorSchema,
}, {
  timestamps: true
})

export default mongoose.model<IPost>("Posts", PostSchema)
