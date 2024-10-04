// models/counter.js
import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },  // For example: 'users'
  seq: { type: Number, default: 0 }       // Sequence number
});

 export default mongoose.model('Counter', counterSchema);
