import express, {Express} from "express"
import mongoose from "mongoose"
import cors from "cors"

import {authRouter} from "./routes/authRouter"
import {postRouter} from "./routes/postRouter"
import {meRouter} from "./routes/meRouter"
import {uploadRouter} from "./routes/uploadRouter";

import * as dotenv from 'dotenv'
dotenv.config();

const app: Express = express()
const PORT: string = process.env.PORT
const URL: string = process.env.SERVER_URL

app.use(express.json())
app.use(cors())
app.use("/uploads", express.static("uploads"))

app.use('/auth', authRouter)
app.use('/me', meRouter)
app.use('/posts', postRouter)
app.use('/upload', uploadRouter)

mongoose.connect(URL)
  .then(() => console.log("DB OK!"))
  .catch(() => console.log("DB Error!")
  )

app.listen(PORT, () => {
  console.log(`Listening port ${PORT}`)
})
