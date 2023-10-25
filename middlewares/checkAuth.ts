import jwt from "jsonwebtoken"
import {NextFunction, Response} from "express";

export default (req: any, res: Response, next: NextFunction) => {
  const accessToken = (req.headers.authorization || "")?.replace(/Bearer\s?/, "")

  if (accessToken) {
    try {
      const decoded: any = jwt.verify(accessToken, "secretPass")

      req.body.userId = decoded._id
      next()
    } catch (e) {
      return res.status(403).json({
        message: "Not success"
      })
    }
  } else {
    return res.status(403).json({
      message: "Not success"
    })
  }
}