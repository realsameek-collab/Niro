import jwt from "jasonwebtoken"

export const genToken = async (userId) => {
    try {
        const token = jwt.sign(userId , process.env.JWT_SECRET , {expireIn : "7d"})
        return token 
    } catch (error) {
        console.log(error)
    }
}