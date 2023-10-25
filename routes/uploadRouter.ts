import {Router} from "express";
import checkAuth from "../middlewares/checkAuth";
import multer from "multer";
import fs from "fs";

const storage: multer.StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads")
    }
    cb(null, "uploads")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload: multer.Multer = multer({storage})

export const uploadRouter = Router({})

uploadRouter.post("/", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file?.originalname}`,
  })
})

