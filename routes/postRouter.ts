import {Router} from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  getTags,
  updatePost
} from "../controllers/post/PostController";
import checkAuth from "../middlewares/checkAuth";
import {postCreateValidation} from "../validations/post";
import {validationMiddleware} from "../middlewares/inputValidationMiddleware";

export const postRouter = Router({})

postRouter.get("/", checkAuth, getPosts)
postRouter.get("/tags", getTags)
postRouter.get("/:id", checkAuth, getPost)
postRouter.post("/", checkAuth, postCreateValidation, validationMiddleware, createPost)
postRouter.delete("/:id", checkAuth, deletePost)
postRouter.patch("/:id", checkAuth, updatePost)