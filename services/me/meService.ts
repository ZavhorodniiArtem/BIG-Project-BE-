import UserModel from "../../models/User";
import {IUserId, IWithOutHashPassword, TUserProfileWithDoc} from "../../controllers/me/types";

export const MeService = {

  async getMe(userId: string): Promise<TUserProfileWithDoc | null> {
    try {
      return await UserModel.findById(userId)
    } catch (error) {
      throw new Error("Something wrong.");
    }
  },

  async updateMe(body: Omit<IWithOutHashPassword, "email"> & IUserId) {
    try {
      return await UserModel.findByIdAndUpdate(body.userId, {
        userName: body.userName || null,
        birthday: body.birthday || null,
      }, { new: true })
    } catch (error) {
      throw new Error("Something wrong.");
    }
  },
}
