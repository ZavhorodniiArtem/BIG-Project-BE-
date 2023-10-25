import {Request, Response} from "express";
import {postService} from "../../services/post/postService";

export const createPost = async (req: Request, res: Response) => {
  try {
    const post = await postService.createNewPost(req.body, req.body.userId)
    res.json(post)
  } catch (err) {
    res.status(500).json({message: "Unable to create post: Server error."})
  }
}

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await postService.getAllPosts()
    res.json(posts)
  } catch (err) {
    res.status(500).json({message: "Unable to fetch posts"})
  }
}

export const getTags = async (req: Request, res: Response) => {
  try {
    const tags = await postService.getAllTags(req.body.limit)
    res.json(tags)
  } catch (err) {
    res.status(500).json({message: "Unable to fetch tags"})
  }
}

export const getPost = async (req: Request, res: Response) => {
  try {
    const postId: string = req.params.id
    const post = await postService.getOnePost(postId)
    res.json(post)
  } catch (err) {
    res.status(500).json({message: "Unable to fetch post"})
  }
}

export const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id
    await postService.deleteOnePost(postId)
    res.json({success: true})
  } catch (err) {
    res.status(500).json({message: "Something wrong!"})
  }
}

export const updatePost = async (req: any, res: any) => {
  try {
    const postId = req.params.id
    await postService.updateOnePost(req.body, postId)
    res.json({success: true})
  } catch (err) {
    res.status(500).json({message: "Something wrong!"})
  }
}