import {Request, Response} from "express";
import {AuthService} from "../../services/auth/authService";
import {IMessage, IRequest} from "../../general";
import {IUser} from "./types";
import {IUserProfile, IWithOutHashPassword} from "../me/types";

export const register = async (req: IRequest<IUser>, res: Response<IWithOutHashPassword | null | IMessage>) => {
  try {
    const { email, password } = req.body;
    const userData = await AuthService.register(email, password)
    res.json(userData)
  } catch (err) {
    res.status(500).json({message: "Registration failed. Something went wrong."})
  }
}

export const login = async (req: IRequest<IUser>, res: Response<IUserProfile | {error: string} | IMessage>) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);

    if (result.error) {
      res.status(400).json({ message: result.error });
    }

    const {passwordHash, ...data} = result;
    res.json(data);
  } catch (err) {
    res.status(401).json({message: "Authentication failed"})
  }
}

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const result = await AuthService.refreshToken(refreshToken);

    res.json(result);
  } catch (err) {
    return res.status(400).json({
      message: "Something wrong!"
    })
  }
}