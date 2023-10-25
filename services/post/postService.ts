import PostModel from "../../models/Post";
import UserModel from "../../models/User";
import User from "../../models/User";
import {IUserProfile} from "../../controllers/me/types";

export const postService = {
  async createNewPost(postData: any, userId: string) {
    try {
      const user: IUserProfile | null = await UserModel.findById(userId)

      const doc = new PostModel({
        title: postData.title,
        description: postData.description,
        tags: postData.tags,
        author: {
          _id: userId,
          userName: user?.userName || "user"
        },
      });
      return await doc.save();
    } catch (error) {
      throw new Error("Unable to create post.");
    }
  },

  async getAllPosts() {
    try {
      // populate - подтягивает полностью обьект user, exec - сохраняет
      return await PostModel.find().populate("author._id").exec();
    } catch (error) {
      throw new Error("Unable to fetch posts.");
    }
  },

  async getOnePost(postId: string) {
    try {
      return await PostModel.findOneAndUpdate(
        {_id: postId}, // найти по айди
        {$inc: {viewsCount: 1}}, // изменить поле
        {returnDocument: "after"} // вернуть с изменениями
      )
    } catch (error) {
      throw new Error("Unable to fetch post.");
    }
  },

  async getAllTags(limit: number = 5) {
    try {
      const posts = await PostModel.find().limit(limit).exec();
      return posts.map((p) => p.tags).flat().slice(0, 5);
    } catch (error) {
      throw new Error("Unable to fetch tags.");
    }
  },

  async updateOnePost(postData: any, postId: string) {
    try {
      return await PostModel.updateOne({_id: postId}, {
        title: postData.title,
        description: postData.description,
        tags: postData.tags,
        imageUrl: postData.imageUrl,
        user: postData.userId,
      })
    } catch (error) {
      throw new Error("Unable to update post.");
    }
  },

  async deleteOnePost(postId: string) {
    try {
      await PostModel.findOneAndDelete({_id: postId})
    } catch (error) {
      throw new Error("Unable to delete post.");
    }
  }
}
