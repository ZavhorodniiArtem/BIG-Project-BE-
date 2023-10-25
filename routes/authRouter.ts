import {Router} from "express"
import {authValidation} from "../validations/auth";
import {login, refreshToken, register} from "../controllers/auth/AuthController";
import {validationMiddleware} from "../middlewares/inputValidationMiddleware";

export const authRouter: Router = Router({})

authRouter.post("/registration", authValidation, validationMiddleware, register)
authRouter.post("/login", authValidation, validationMiddleware, login)
authRouter.post("/refresh-token", refreshToken)

