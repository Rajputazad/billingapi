import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const conndb =()=>{
mongoose.set("strictQuery",false)
mongoose.connect(process.env.MONGO_URL)
const server= mongoose.connection
server.on("connected",function(){
    console.log("Successfully connected to MongoDB !!!");

})
server.on("disconnected",function(){
    console.log("Successfully disconnected to MongoDB !!!");

})
server.on("error",console.error.bind(console, "connection error:"))
}
export default conndb;