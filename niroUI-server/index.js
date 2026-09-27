import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { connectDb } from "./config/connectDb.js"
import authRouter from "./routes/auth.route.js"
import cors from "cors"
import userRouter from "./routes/user.route.js"
dotenv.config()
const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
const PORT = process.env.PORT
app.use(express.json())
app.use(cookieParser())
app.get("/" , (req,res)=>{
      res.json("Hello from server")
})
app.use("/api/auth" , authRouter)
app.use("/api/user" , userRouter)
app.listen(PORT , ()=>{
    console.log(`Server Started at ${PORT}`)
    connectDb()
})