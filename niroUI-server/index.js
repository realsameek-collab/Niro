import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { connectDb } from "./config/connectDb.js"
import authRouter from "./routes/auth.route.js"
dotenv.config()
const app = express()
const PORT = process.env.PORT
app.use(express.json())
app.use(cookieParser())
app.get("/" , (req,res)=>{
      res.json("Hello from server")
})
app.use("/api/auth" , authRouter)
app.listen(PORT , ()=>{
    console.log(`Server Started at ${PORT}`)
    connectDb()
})