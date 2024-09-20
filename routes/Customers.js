import express from "express";
import auth from "../middleware/auth.js";
import customerdetals from "../db/models/Customers.js";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

router.post("/customer", auth, async (req, res) => {
 try {
     const id = req.decoded.userid;
     
    if (!req.body.name || !req.body.gstin || !req.body.address || !req.body.phone) {
      return res
        .status(400)
        .json({ success: false, message: "Enter all details" });
    }
     const data = {
       id: id,
       name: req.body.name,
       gstin: req.body.gstin,
       address: req.body.address,
       phone: req.body.phone,
     };
   console.log(data);
   
     const sent = await customerdetals(data)
     const result = await sent.save()
 return    res.status(200).json({
        data: result,
        success: true,
        message: "Customer added successfully",
      });
 } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log(error);
 }

});

router.get('/customers',auth, async (req, res) => {
  try {
      // const id = req.decoded.userid;
    // Find all users with the given name
    const users = await customerdetals.find()
    const reversedUsers = users.reverse();
    // const users = await customerdetals.find({ id: id })
    // if (users.length === 0) {
    //   return res.status(404).json({ success: false, message: "No users found with that name" });
    // }
    res.status(200).json({ success: true, data: reversedUsers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log(error);
  }
});


router.delete("/customers/:_id",auth, async (req, res) => {
  try {
    console.log(req.body.id, req.decoded.userid);
    
    if(req.decoded.role_Id===0|| req.decoded.userid===req.body.id){
    var result = await customerdetals.findByIdAndDelete(req.params._id);
    res
      .status(200)
      .json({ success: true, message: "User successfully Deleted!" });}else{
          return res.status(401).json({
            success: false,
            message: "Access denied",
          });
      }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log(error);
  }
});

 export default router