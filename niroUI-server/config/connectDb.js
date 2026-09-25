import mongoose from "mongoose"
import dotenv from "dotenv"
import dns from "dns"
dns.setServers(['8.8.8.8', '1.1.1.1']); // Forces Google & Cloudflare DNS

dotenv.config()

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DataBase connected Successfully")
    } catch (error) {
        console.log(`DataBase Error ${error}`)
    }
}