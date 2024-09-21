import mongoose from "mongoose";

const invoice = mongoose.Schema({
   id:{require:true,type:String},
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
});

export default mongoose.model("invoice",invoice);
