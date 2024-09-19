import mongoose from "mongoose";
const schema = new mongoose.Schema({
  Model0:[],
  Model1:[]
},{timestamps:true})

export default mongoose.model("Menus",schema);