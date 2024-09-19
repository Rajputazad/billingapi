import mongoose from "mongoose";

const customerdetals = mongoose.Schema({
    id:{
        require: [true, "id required"],
        type: String,
    },
    name: {
        require: [true, "name required"],
        type: String,
      },
      gstin: {
        require: [true, "gstin  required"],
        type: String,
      },
      address: {
        require: [true, "address  required"],
        type: String,
      },
      phone: {
        require: [true, "phone  required"],
        type: String,
        // type: String
      },
})


export default mongoose.model("customer",customerdetals)