import express from "express";
import auth from "../middleware/auth.js";
import invoice from "../db/models/invoice.js";
const router = express.Router();

router.post("/invoice", auth, async (req, res) => {
  try {
    const id = req.decoded.userid;

    const data = {
      id: id,
      items: req.body.items,
      from: req.body.from,
      to: req.body.to,
      total: req.body.total,
      totalCGST: req.body.totalCGST,
      totalSGST: req.body.totalSGST,
      totaldisc: req.body.totaldisc,
      vehicleDetails: req.body.vehicleDetails,
      paymentMethod: req.body.paymentMethod,
      vailed: req.body.vailed,
      documentdetail: req.body.documentdetail,
      documenttime: req.body.documenttime,
    };

    const result = await invoice(data);
    const datas = await result.save();
    return res.status(200).json({
      success: true,
      message: "PDF generated successfully",
      data: datas._id,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log(error);
  }
});

router.get("/invoice", auth, async (req, res) => {
  try {
    const id = req.decoded.userid;
    const users = await invoice.find({ id: id });
    // Find all users with the given name
    //   const users = await customerdetals.find()
    const reversedUsers = users.reverse();
    // if (users.length === 0) {
    //   return res.status(404).json({ success: false, message: "No users found with that name" });
    // }
    res.status(200).json({ success: true, data: reversedUsers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log(error);
  }
});
router.get("/pdf/:_id", auth, async (req, res) => {
  try {
    const data = await invoice.findById(req.params._id);
    if (req.decoded.userid == data.id) {
      res.status(200).json({ success: true, data: data });
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

router.delete("/invoice/:_id", auth, async (req, res) => {
  try {
    if (req.decoded.role_Id === 0 || req.decoded.userid === req.body.id) {
      var result = await invoice.findByIdAndDelete(req.params._id);
      res
        .status(200)
        .json({ success: true, message: "User successfully Deleted!" });
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
