import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import auth from "../middleware/auth.js";
import userdetails from "../db/models/Authuser.js";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const multe = multer();
const router = express.Router();

router.post("/register", multe.any(), async (req, res) => {
  console.log(SECRET_KEY);

  try {
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;
    const role_Id = req.body.role_Id;
    const superAdminPassword = req.body.superAdminPassword;

    if (!phone || !email || !password || !superAdminPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Enter all details" });
    }
    if (superAdminPassword != 78789898) {
      return res.status(401).json({
        success: false,
        message: "Super admin is not authenticated",
      });
    }
    const existingUser = await userdetails.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const creatusere = await userdetails.create({
        phone: phone,
        email: email,
        password: hashedPassword,
        role_Id: role_Id || 1,
        verify: true,
      });
      const token = jwt.sign({ userid: creatusere._id }, SECRET_KEY, {
        expiresIn: "24h",
      });
      creatusere.token[0] = token;
      await creatusere.save();
      const userdatas = await userdetails
        .findOne(creatusere._id)
        .select("-password -token");
      res.status(200).json({
        token: token,
        data: userdatas,
        success: true,
        message: "User registered successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/login", multe.any(), async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await userdetails.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    if (user.active == false) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Subscription has expired, Please contact superadmin",
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userid: user._id, role_Id: user.role_Id },
      SECRET_KEY
    );

    user.token[0] = token;
    await user.save();
    const userdatas = await userdetails
      .findOne(user._id)
      .select("-password -token -ip");
    res.status(200).json({
      token: token,
      data: userdatas,
      success: true,
      message: "User Login successfully",
    });

    // console.log("run");
    // }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/home", auth, async (req, res) => {
  try {
    const userid = req.decoded.userid;

    const userdatas = await userdetails
      .findById(userid)
      .select("-password -token");
    if (userdatas) {
      res.status(200).json({ success: true, data: userdatas });
    } else {
      res.status(401).json({ success: false, message: "User not exists" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log(error);
  }
});

router.get("/getusers", auth, async (req, res) => {
  try {
    const userid = req.decoded.userid;
    var rolid = req.decoded.role_Id;

    if (rolid == 0) {
      const result = await userdetails
        .find({ _id: { $ne: userid } })
        .select("-password -token -signature");
        const reversedUsers = result.reverse();
      res.status(200).json({ success: true, data: reversedUsers });
    } else {
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
router.delete("/deleteusers/:_id",auth, async (req, res) => {
  try {
    if(req.decoded.role_Id===0){
    var result = await userdetails.findByIdAndDelete(req.params._id);
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

router.put("/updateusers/:_id",auth, async (req, res) => {
  try {
    console.log(Object.keys(req.body).length);
    // console.log(req.body);
    if (Object.keys(req.body).length == 13) {
      req.body.profilecomplete = true;
    }
    var result = await userdetails.findByIdAndUpdate(req.params._id, {
      $set: req.body,
    });
    res
      .status(200)
      .json({ success: true, message: "User successfully Updated!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log(error);
  }
});
router.get("/user/:_id", multe.any(), async (req, res) => {
  try {
    const result = await userdetails.findById(req.params._id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log(error);
  }
});

router.post("/newpasss", multe.any(), auth, async (req, res) => {
  try {
    const newpass = req.body.newpassword;
    const oldpass = req.body.oldpassword;
    const userid = req.decoded.userid;
    const userdatas = await userdetails.findById(userid);
    if (!userdatas) {
      return res
        .status(401)
        .json({ success: false, message: "User not exists" });
    }
    const isPasswordValid = await bcrypt.compare(oldpass, userdatas.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    } else {
      const udpass = await bcrypt.hash(newpass, 10);
      userdatas.password = udpass;
      await userdatas.save();
      return res
        .status(200)
        .json({ success: true, message: "Password updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log(error);
  }
});

router.post("/active/:_id", auth, async (req, res) => {
  try {
    var rolid = req.decoded.role_Id;

    if (rolid == 0) {
      const userid = req.params._id;
      const result = await userdetails
        .findById(userid)
        .select("-password -token -signature");
      result.active = req.body.active;
      await result.save();
      if (req.body.active == true) {
        return res
          .status(200)
          .json({ success: true, message: "User Activated" });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "User Deactivated" });
      }
    } else {
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

export default router;
