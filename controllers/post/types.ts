import {Document} from "mongoose";

export interface IAuthor {
  _id: string
  userName: string
}

export interface IPost {
  title: string
  description: string
  tags: string[]
  viewsCount: number
  author: IAuthor
}

export type IPostWithDoc = IPost & Document