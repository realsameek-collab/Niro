import User from "../models/user.model.js"



export const googleAuth = async () => {
    try {
        const {name, email} = req.body
        let user = await User.findOne({
            email
        })
        if(!user){
            user = await User.create({
                name,email
            })
        }
    } catch (error) {
        
    }
}