import mongoose from "mongoose";
import Counter from "./counter.js";

const invoice = mongoose.Schema({
   id:{require:true,type:String},
   billno:{ type: Number, unique: true},
  items: [],
  from: [],
  to: [],
  total: { require: true, type: String },
  totalCGST: { require: true, type: String },
  totalSGST: { require: true, type: String },
  totaldisc: { require: true, type: String },
  vehicleDetails: [],
  paymentMethod: { require: true, type: String },
  vailed: { require: true, type: String },
  documentdetail: { require: true, type: String },
  documenttime: { require: true, type: String },
  expireAt: {
    type: Date,
    default: () => {
      let twoMonthsLater = new Date();
      twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);
      return twoMonthsLater;
    },
    index: { expires: '0' },
  }
});
invoice.pre('save', async function (next) {
  const doc = this;

  // Find and increment the counter for 'users'
  const counter = await Counter.findByIdAndUpdate(
    { _id: 'invoice' },
    { $inc: { seq: 1 } },  // Increment sequence by 1
    { new: true, upsert: true }  // Create the counter if it doesn't exist
  );

  doc.billno = counter.seq;  // Assign the incremented sequence as 'id'
  next();
});
export default mongoose.model("invoice",invoice);
