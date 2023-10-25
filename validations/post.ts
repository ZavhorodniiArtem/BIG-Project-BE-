import {body} from "express-validator"

export const postCreateValidation = [
  body("title", "Title must be at least 4 characters").isLength({min: 4}).isString(),
  body("description", "Description must be at least 10 characters").isLength({min: 10}).isString(),
  body("tags").optional().isArray(),
]