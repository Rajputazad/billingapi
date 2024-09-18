import mongoose from "mongoose";
const userdetails=mongoose.Schema({
    phone: {
        require: [true, "User mobile required"],
        unique: [true, "mobile number already exists. try another"],
        type: String,
      },
      password: {
        require: [true, "Password  required"],
        type: String,
      },
      ownername: {
        require: [true, "ownername  required"],
        type: String,
      },
      email: {
        require: [true, "email  required"],
        type: String,
        unique: [true, "Email already exists. try another"],
        // type: String
      },
      businessName: {
        require: [true, "businessName  required"],
        type: String,
      },
    
      verify: {
        require: [true, "verify  required"],
        type: Boolean,
      },
      token: [],
      role_Id: {
        require: [true, "role_Id  required"],
        type: Number,
        default: 1,
      },
      address:{
        require:[true, "address  required"],
        type:String

      },
      state:{
        require:[true, "state  required"],
        type:String

      },
      pincode:{
        require:[true, "pincode  required"],
        type:String

      },
      city:{
        require:[true, "city  required"],
        type:String

      },
      gstin:{
        require:[true, "gstin  required"],
        type:String

      },
      businessType:{
        require:[true, "businessType  required"],
        type:String

      },
      industryType:{
        require:[true, "industryType  required"],
        type:String

      },
      businessRegType:{
        require:[true, "businessRegType  required"],
        type:String

      },
      signature:{
        require:[true, "businessRegType  required"],
        type:String

      },
      profilecomplete:{
        require:[true,"profile required"],
        type:Boolean,
        default:false
      },
      active:{
        require:[true,"profile required"],
        type:Boolean,
        default:true
      },
      ip:[]
})

export default mongoose.model("Userdetals", userdetails)