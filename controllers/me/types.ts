import {Document} from "mongoose";

export interface IUserId {
  userId: string
}

export interface IUserProfile {
  email: string
  passwordHash: string
  userName: string | null
  birthday: string | null
  subscription: string | null
  token: string
  refreshToken: string
}

export type TUserProfileWithDoc = IUserProfile & Document

export type IWithOutHashPassword = Omit<TUserProfileWithDoc, "passwordHash">

