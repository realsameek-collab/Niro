import mongoose from "mongoose";



const userSchema = mongoose.Schema({
      name : {
        type:String,
        require:true
      },
      email:{
        type:String,
        require:true,
        unique:true
      },
      role:{
        type:String,
        enum:["user" , "admin"],
        default:"user"
      },
      aiCredits:{
        type:Number,
        default: 150
      }
},{timestamps:true})

const User = mongoose.model("user", userSchema)

export default User