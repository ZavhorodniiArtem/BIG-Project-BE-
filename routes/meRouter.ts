import {Router} from "express";
import checkAuth from "../middlewares/checkAuth";
import {getMe, updateMe} from "../controllers/me/MeController";

export const meRouter = Router({})

meRouter.get("/", checkAuth, getMe)
meRouter.patch("/", checkAuth, updateMe)
