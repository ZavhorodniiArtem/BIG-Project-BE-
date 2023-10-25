import mongoose from 'mongoose';

const Schema = mongoose.Schema

const AuthorSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userName: {
    type: String,
  },
});

const PostSchema = new Schema({
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

export default mongoose.model("Posts", PostSchema)
