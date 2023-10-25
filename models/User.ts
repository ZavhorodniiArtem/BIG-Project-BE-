import mongoose from "mongoose";
import {IUserProfile} from "../controllers/me/types";

const UserSchema = new mongoose.Schema<IUserProfile>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    default: null
  },
  birthday: {
    type: String,
    default: null
  },
  subscription: {
    type: String,
    default: null
  },
  token: String,
  refreshToken: String,
}, {
  timestamps: true
})

const UserModel = mongoose.model<IUserProfile>('User', UserSchema);

export default UserModel;
