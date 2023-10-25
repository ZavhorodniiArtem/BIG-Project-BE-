import {MeService} from "../../services/me/meService"
import {IMessage, IRequest} from "../../general";
import {IWithOutHashPassword, IUserId, TUserProfileWithDoc} from "./types";
import {Response} from "express";

export const getMe = async (req: IRequest<IUserId>, res: Response<TUserProfileWithDoc | null | IMessage>) => {
  try {
    const userData: TUserProfileWithDoc | null = await MeService.getMe(req.body.userId)

    if (!userData) {
      return res.json({message: "Something error"})
    }

    const {passwordHash, ...data} = userData.toObject()
    res.json(data)

  } catch (err) {
    res.status(400).json({message: "Something wrong."})
  }
}

export const updateMe = async (req: IRequest<IWithOutHashPassword & IUserId>, res: Response<IWithOutHashPassword | null | IMessage>) => {
  try {
    const userData: IWithOutHashPassword | null = await MeService.updateMe(req.body)
    res.json(userData)
  } catch (err) {
    return res.status(400).json({message: "Something wrong!"})
  }
}