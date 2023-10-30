import {Response} from "express";
import {AuthService} from "../../services/auth/authService";
import {IMessage, IRequest} from "../../general";
import {IUser} from "./types";
import {IUserProfile, IWithOutHashPassword, TUserProfileWithDoc} from "../me/types";

export const register = async (req: IRequest<IUser>, res: Response<IWithOutHashPassword | IMessage>) => {
  try {
    const { email, password } = req.body;
    const userData: TUserProfileWithDoc = await AuthService.register(email, password)

    if (!userData) {
      return {message: "Registration failed. Something went wrong."}
    }

    res.json(userData)
  } catch (err) {
    res.status(500).json({message: "Registration failed. Something went wrong."})
  }
}

export const login = async (req: IRequest<IUser>, res: Response<IUserProfile | IMessage>) => {
  try {
    const { email, password } = req.body;
    const result: TUserProfileWithDoc | IMessage = await AuthService.login(email, password);

    if ("message" in result) {
      return res.status(400).json(result);
    }

    const {passwordHash, ...data} = result.toObject();
    res.json(data);
  } catch (err) {
    res.status(401).json({message: "Authentication failed"})
  }
}

export const refreshToken = async (req: IRequest<Pick<IUserProfile, "refreshToken">>, res: Response<IMessage | Pick<IUserProfile, "token">>) => {
  try {
    const { refreshToken } = req.body;
    const result: IMessage | Pick<IUserProfile, "token"> = await AuthService.refreshToken(refreshToken);

    res.json(result);
  } catch (err) {
    return res.status(400).json({
      message: "Something wrong!"
    })
  }
}