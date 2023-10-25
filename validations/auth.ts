import {body} from "express-validator"

export const authValidation = [
  body("email", "Email address is incorrect").isEmail(),
  body("password", "Password must be at least 8 characters").isLength({min: 8}),
]