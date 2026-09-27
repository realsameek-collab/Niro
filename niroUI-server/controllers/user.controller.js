import User from "../models/user.model.js"

export const getCurrentUser = async (req,res) => {
    try {
        const user = await User.findById(req.userId)
        if(!user){
            return res.status(404).json({message:"failed to get current User"})
        }
        return res.status(200).json(user)
    } catch (error) {
         return res.status(500).json({message:`get current user error ${error}`})
    }
}