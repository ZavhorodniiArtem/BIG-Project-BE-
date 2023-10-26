import {Request, Response} from "express";
import {postService} from "../../services/post/postService";
import {IMessage, IRequest} from "../../general";
import {IUserId} from "../me/types";
import {IPost, IPostWithDoc} from "./types";

export const createPost = async (req: IRequest<Omit<IPost, "author"> & IUserId>, res: Response<IPost | IMessage>) => {
  try {
    const post: IPostWithDoc | IMessage = await postService.createNewPost(req.body, req.body.userId)
    res.json(post)
  } catch (err) {
    res.status(500).json({message: "Unable to create post: Server error."})
  }
}

export const getPosts = async (req: IRequest<IUserId>, res: Response<IPost[] | IMessage>) => {
  try {
    const posts: IPost[] = await postService.getAllPosts()
    res.json(posts)
  } catch (err) {
    res.status(500).json({message: "Unable to fetch posts"})
  }
}

export const getTags = async (req: IRequest<{limit: number}>, res: Response<string[] | IMessage>) => {
  try {
    const tags: string[] = await postService.getAllTags(req.body.limit)
    res.json(tags)
  } catch (err) {
    res.status(500).json({message: "Unable to fetch tags"})
  }
}

export const getPost = async (req: Request, res: Response<IPost | IMessage>) => {
  try {
    const postId: string = req.params.id
    const post: IPost | IMessage = await postService.getOnePost(postId)
    res.json(post)
  } catch (err) {
    res.status(500).json({message: "Unable to fetch post"})
  }
}

export const deletePost = async (req: Request, res: Response<IMessage>) => {
  try {
    const postId: string = req.params.id
    await postService.deleteOnePost(postId)
    res.json({message: "This post was deleted"})
  } catch (err) {
    res.status(500).json({message: "Something wrong!"})
  }
}

export const updatePost = async (req: IRequest<IPost> & Request, res: Response<IMessage>) => {
  try {
    const postId: string = req.params.id
    await postService.updateOnePost(req.body, postId)
    res.json({message: "Post was updated"})
  } catch (err) {
    res.status(500).json({message: "Something wrong!"})
  }
}